import { React, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function NavBar() {
    // Used for checking which page is active.
    // useEffect(() => {
    //     console.log(location.pathname)
    // })

    let navigate = useNavigate();
    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    })
    const [showloginmodal, setloginmodalShow] = useState(false);
    const handleLoginModalClose = () => setloginmodalShow(false);
    const handleLoginModalShow = () => setloginmodalShow(true);

    const LoginchangeFunction = (e) => {
        setcredentials({ ...credentials, [e.target.name]: [e.target.value] })
    }

    const handleLoginModalSubmit = async (e) => {
        e.preventDefault();
        // APi call
        const response = await fetch(`http://localhost:4000/api/auth/signIn`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email.toString(), password: credentials.password.toString() })
        })
        const fetchedData = await response.json()
        //Save authtoken in local storage
        if (fetchedData.message) {
            localStorage.setItem('token', fetchedData.authtoken)
            handleLoginModalClose();
            navigate("../addNotes", { replace: true });
        }
        else{
            console.log(fetchedData.errors)
        }
    }

    const [signupform, setsignupform] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [showsignupmodal, setsignupmodalShow] = useState(false);
    const handleSignupModalClose = () => setsignupmodalShow(false);
    const handleSignupModalShow = () => setsignupmodalShow(true);

    const SigupchangeFunction = (e) => {
        setsignupform({ ...signupform, [e.target.name]: [e.target.value] })
    }

    const handleSignupModalSubmit = async (e) => {
        e.preventDefault();
        // console.log("signup modal submit")
        // APi call
        const response = await fetch(`http://localhost:4000/api/auth/signUp`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: signupform.name.toString(), email: signupform.email.toString(), password: signupform.password.toString() })
        })
        const fetchedData = await response.json()
        //Save authtoken in local storage
        if (fetchedData.message) {
            localStorage.setItem('token', fetchedData.authtoken)
            handleSignupModalClose();
            navigate("../addNotes", { replace: true });
        }
        else
        {
            console.log(fetchedData.errors)
        }
    }

   

    let location = useLocation();
    return (
        <>
            <div>
                {/* Login Modal code with react bootstrap liberary  */}
                <Modal show={showloginmodal} onHide={handleSignupModalClose}>
                    <Modal.Header >
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={LoginchangeFunction} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={LoginchangeFunction} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleLoginModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleLoginModalSubmit}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                {/* Signup Modal code with react bootstrap liberary  */}
                <Modal show={showsignupmodal} onHide={handleSignupModalClose}>
                    <Modal.Header >
                        <Modal.Title>Signup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" placeholder="Enter name" onChange={SigupchangeFunction} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={SigupchangeFunction} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Enter Password" onChange={SigupchangeFunction} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">Password</label>
                                <input type="cpassword" className="form-control" id="cpassword" name='cpassword' placeholder="Confirm Password" onChange={SigupchangeFunction} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleSignupModalClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSignupModalSubmit}>
                            Signup
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Free-Notes</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${location.pathname === "/addnotes" ? "active" : ""} `}>
                            <Link className="nav-link" to="/addNotes">AddNotes </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === "/about" ? "active" : ""} `}>
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link disabled" to="/home">Disabled</a>
                        </li> */}
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <Link type="button" className="btn btn-outline-primary mx-2" to="/" onClick={handleLoginModalShow}>LogIn</Link>
                        <Link type="button" className="btn btn-outline-primary" to="/" onClick={handleSignupModalShow}>SignUp</Link>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default NavBar