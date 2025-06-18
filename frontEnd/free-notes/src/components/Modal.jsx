import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../App.css";

const CustomModal = ({
  showloginmodal,
  handleSignupModalClose,
  title,
  LoginchangeFunction,
  handleLoginModalClose,
  handleLoginModalSubmit,
  textcolor,
  bgColor,
}) => {
  return (
    <Modal show={showloginmodal} onHide={handleSignupModalClose}>
      <Modal.Header
        style={{
          background: bgColor,
        }}
      >
        <Modal.Title className={`text-${textcolor}`}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: bgColor,
        }}
      >
        <form>
          <div className="form-group">
            <label className={`text-${textcolor}`} htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={LoginchangeFunction}
            />
          </div>
          <div className="form-group">
            <label className={`text-${textcolor}`} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              onChange={LoginchangeFunction}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{
          background: bgColor,
        }}
      >
        <Button variant="secondary" onClick={handleLoginModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLoginModalSubmit}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
