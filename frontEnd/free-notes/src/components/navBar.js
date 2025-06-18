import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import "../App.css";
import CustomModal from "./Modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function NavBar(props) {
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const [showloginmodal, setloginmodalShow] = useState(false);
  const handleLoginModalClose = () => setloginmodalShow(false);
  const handleLoginModalShow = () => setloginmodalShow(true);

  const LoginchangeFunction = (e) => {
    setcredentials({ ...credentials, [e.target.name]: [e.target.value] });
  };

  const handleLoginModalSubmit = async (e) => {
    e.preventDefault();
    // APi call
    const response = await fetch(
      `${process.env.REACT_APP_BE_DOMAIN}/api/auth/signIn`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email.toString(),
          password: credentials.password.toString(),
        }),
      }
    );
    const fetchedData = await response.json();
    //Save authtoken in local storage
    if (fetchedData.message) {
      localStorage.setItem("token", fetchedData.authtoken);
      handleLoginModalClose();
      navigate("../addNotes", { replace: true });
      props.showAlert("Login Successfully", "success");
    } else {
      // handleLoginModalClose();
      // props.showAlert(, "danger")
      return cogoToast.error(fetchedData.errors);
      // console.log(fetchedData.errors)
    }
  };

  const [signupform, setsignupform] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showsignupmodal, setsignupmodalShow] = useState(false);
  const handleSignupModalClose = () => setsignupmodalShow(false);
  const handleSignupModalShow = () => setsignupmodalShow(true);

  const SigupchangeFunction = (e) => {
    setsignupform({ ...signupform, [e.target.name]: [e.target.value] });
  };

  const handleSignupModalSubmit = async (e) => {
    e.preventDefault();
    // console.log("signup modal submit")
    // APi call
    if (signupform.password.toString() !== signupform.cpassword.toString()) {
      // console.log(signupform.password,signupform.cpassword)
      return cogoToast.error("Password does not Match!!");
    }
    const response = await fetch(
      `${process.env.REACT_APP_BE_DOMAIN}/api/auth/signUp`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: signupform.name.toString(),
          email: signupform.email.toString(),
          password: signupform.password.toString(),
        }),
      }
    );
    const fetchedData = await response.json();
    //Save authtoken in local storage

    if (fetchedData.message) {
      handleSignupModalClose();
      navigate("../", { replace: true });
      props.showAlert("Account Created Successfully", "success");
    } else {
      // handleSignupModalClose();
      if (fetchedData.errors.param === "name")
        return cogoToast.error("Please enter name greater than 3 char");

      // console.log(fetchedData.errors)
    }
  };

  const handleLogout = () => {
    navigate("../", { replace: true });
    props.showAlert("Logout Successfully", "success");
    localStorage.removeItem("token");
  };

  // if (localStorage.getItem("token")) {
  //   jwt_decode(localStorage.getItem("token"));
  // }

  let location = useLocation();
  return (
    <>
      {showloginmodal && (
        <CustomModal
          showloginmodal={showloginmodal}
          handleSignupModalClose={handleSignupModalClose}
          title={"Login"}
          LoginchangeFunction={LoginchangeFunction}
          handleLoginModalClose={handleLoginModalClose}
          handleLoginModalSubmit={handleLoginModalSubmit}
          textcolor={props.mode === "primary" ? "black" : props.textcolor}
          bgColor={props.mode === "primary" ? "white" : "#343a40"}
        />
      )}

      <div>
        {/* Signup Modal code with react bootstrap liberary  */}
        <Modal show={showsignupmodal} onHide={handleSignupModalClose}>
          <Modal.Header
            style={{
              background: props.mode === "primary" ? "white" : "#343a40",
            }}
          >
            <Modal.Title
              className={
                props.mode === "primary" ? "black" : `text-${props.textcolor}`
              }
            >
              Signup
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              background: props.mode === "primary" ? "white" : "#343a40",
            }}
          >
            <form>
              <div className="form-group">
                <label
                  className={
                    props.mode === "primary"
                      ? "black"
                      : `text-${props.textcolor}`
                  }
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter name"
                  onChange={SigupchangeFunction}
                />
              </div>
              <div className="form-group">
                <label
                  className={
                    props.mode === "primary"
                      ? "black"
                      : `text-${props.textcolor}`
                  }
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={SigupchangeFunction}
                />
              </div>
              <div className="form-group">
                <label
                  className={
                    props.mode === "primary"
                      ? "black"
                      : `text-${props.textcolor}`
                  }
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  onChange={SigupchangeFunction}
                />
              </div>
              <div className="form-group">
                <label
                  className={
                    props.mode === "primary"
                      ? "black"
                      : `text-${props.textcolor}`
                  }
                  htmlFor="cpassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  onChange={SigupchangeFunction}
                />
                <div className="check mx-2 text-danger"></div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer
            style={{
              background: props.mode === "primary" ? "white" : "#343a40",
            }}
          >
            <Button variant="secondary" onClick={handleSignupModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSignupModalSubmit}>
              Signup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <Link className={`navbar-brand text-${props.textcolor}`} to="/">
          Free-Notes
        </Link>

        <ul className="navbar-nav mr-auto">
          <li
            className={`nav-item ${
              location.pathname === "/addnotes" ? "active" : ""
            } `}
          >
            <Link
              className={` nav-link text-${props.textcolor}`}
              to="/addNotes"
            >
              AddNotes{" "}
            </Link>
          </li>
        </ul>

        <div
          className={`form-check form-switch text-${
            props.mode === `light` ? `dark` : `light`
          }`}
        >
          <input
            className="form-check-input"
            onClick={props.toggleMode}
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          ></input>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Enable Dark Mode
          </label>
        </div>

        {!localStorage.getItem("token") ? (
          <form className="form-inline my-2 my-lg-0">
            <Link
              type="button"
              className={`btn btn-outline-primary text-${props.textcolor} mx-2`}
              to="#"
              onClick={handleLoginModalShow}
            >
              LogIn
            </Link>
            <Link
              type="button"
              className={`btn btn-outline-primary text-${props.textcolor}`}
              to="#"
              onClick={handleSignupModalShow}
            >
              SignUp
            </Link>
          </form>
        ) : (
          <div className="dropdown">
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
