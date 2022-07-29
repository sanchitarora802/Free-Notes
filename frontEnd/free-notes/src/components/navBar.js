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
        email:"",
        password:""
    })
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // APi call
        const response = await fetch(`http://localhost:4000/api/auth/signIn`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email.toString(), password: credentials.password.toString()})
        })
        const fetchedData = await response.json()
        //Save authtoken in local storage
        localStorage.setItem('token',fetchedData.authtoken)
        if(fetchedData.message)
        {
            handleClose();
            navigate("../addNotes", { replace: true });
        }
    }

    const changeFunction = (e) => {
         setcredentials({ ...credentials, [e.target.name]: [e.target.value] })
    }

    let location = useLocation();
    return (
        <>
            <div>
                {/* Modal code with react bootstrap liberary  */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={changeFunction} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" onChange={changeFunction} />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>
                            Login
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
                        <Link type="button" className="btn btn-outline-primary mx-2" to="/" onClick={handleShow}>LogIn</Link>
                        <Link type="button" className="btn btn-outline-primary" to="/" onClick={handleShow}>SignUp</Link>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default NavBar