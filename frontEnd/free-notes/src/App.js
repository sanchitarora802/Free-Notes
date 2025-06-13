import "./App.css";
import Navbar from "./components/navBar";
import Alert from "./components/Alert";
// import About from "./components/about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./contexts/notes/noteState";
import AddNotes from "./components/AddNotes";
import { useState } from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [alert, setAlert] = useState(null);

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

  const toggleMode = () => {
    if (mode === "primary") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
      settextcolor("warning");
      settextheadingcolor("warning");
    } else {
      setMode("primary");
      document.body.style.backgroundColor = "white";
      settextcolor("white");
      settextheadingcolor("black");
    }
  };

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
