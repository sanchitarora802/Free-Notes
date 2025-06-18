import React, { useContext } from "react";
import "../App.css";
import UserContext from "../contexts/user/userContext";

function Home(props) {
  const context = useContext(UserContext);
  return (
    <div className="main-content">
      <h2 className={`text-${props.textheadingcolor} text-left ml-4`}>
        {context?.userDetails?.name &&
          `Welcome ${context?.userDetails?.name} 👋`}
      </h2>
      <div className="centered-container container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div
          className={`w-100`}
          style={{
            height: "100%",
            maxWidth: 600,
            background: props.bgColor,
          }}
        >
          <div
            className={`card shadow-lg p-4 border-0 text-${props.textheadingcolor}`}
            style={{
              background: props.bgColor,
            }}
          >
            <div className={`text-center mb-3 text-${props.textheadingcolor}`}>
              <i
                className="bi bi-journal-richtext"
                style={{ fontSize: "3rem", color: props.svgColor }}
              ></i>
            </div>
            <p
              className={`mb-4 text-secondary text-center text-${props.textheadingcolor}`}
            >
              Your personal space to organize thoughts, ideas, and important
              information.
            </p>
            <ul className="list-unstyled mb-4">
              <li>📝 Create, edit, and delete notes easily</li>
              <li>🔒 Keep your notes private and secure</li>
              <li>📚 Organize everything in one place</li>
              <li>💡 Access your notes anytime, anywhere</li>
            </ul>
            <div className="text-center">
              <a
                href="/addNotes"
                className={`btn btn-outline-${
                  props.mode === "primary" ? "" : "primary"
                } text-${
                  props.mode === "primary" ? "primary" : props.textheadingcolor
                } px-4`}
              >
                Add Your First Note
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
