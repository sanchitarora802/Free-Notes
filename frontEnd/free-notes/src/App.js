import "./App.css";
import Navbar from "./components/navBar";
import Alert from "./components/Alert";
// import About from "./components/about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./contexts/notes/noteState";
import AddNotes from "./components/AddNotes";
import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import UserContext from "./contexts/user/userContext";
import jwt_decode from "jwt-decode";

function App() {
  const [alert, setAlert] = useState(null);
  const context = useContext(UserContext);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const [mode, setMode] = useState("primary"); //state 1 saved
  const [textcolor, settextcolor] = useState("white"); //state 2 saved
  const [textheadingcolor, settextheadingcolor] = useState("black"); //state 3 saved
  const [svgColor, setSvgColor] = useState(""); //state 4 saved
  const [bgColor, setBgColor] = useState("white"); //state 5 saved

  const toggleMode = () => {
    if (mode === "primary") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      settextcolor("warning");
      settextheadingcolor("warning");
      setSvgColor("#ffc107");
      setBgColor("#000");
    } else {
      setMode("primary");
      document.body.style.backgroundColor = "white";
      settextcolor("white");
      settextheadingcolor("black");
      setSvgColor("#007bff");
      setBgColor("#fff");
    }
  };

  useEffect(() => {
    let existingtoken = localStorage.getItem("token");
    if (existingtoken) {
      let res = jwt_decode(existingtoken);
      context.setUserDetails(res?.user);
    }
  }, []);

  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar
            showAlert={showAlert}
            mode={mode}
            textcolor={textcolor}
            toggleMode={toggleMode}
          />
          <Alert alert={alert} />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  mode={mode}
                  textcolor={textcolor}
                  textheadingcolor={textheadingcolor}
                  svgColor={svgColor}
                  bgColor={bgColor}
                />
              }
            />
            <Route
              exact
              path="/addNotes"
              element={
                <AddNotes
                  mode={mode}
                  textcolor={textcolor}
                  textheadingcolor={textheadingcolor}
                  showAlert={showAlert}
                />
              }
            />
            {/* <Route exact path="/about" element={<About />} /> */}
          </Routes>
        </Router>
        <Footer mode={mode} textcolor={textcolor} />
      </NoteState>
    </>
  );
}

export default App;
