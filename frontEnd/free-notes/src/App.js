import './App.css';
import Home from './components/home'
import Navbar from './components/navBar'
import Alert from './components/Alert';
import About from './components/about'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from './contexts/notes/noteState';
import AddNotes from './components/AddNotes';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }

  return (
    <>
    <NoteState showAlert={showAlert} >
    <Router>
    <Navbar  showAlert={showAlert} />
    <Alert alert={alert} />
     <Routes>
     <Route exact path='/' element = {<Home />} />
      <Route exact path='/addNotes' element = {<AddNotes/>} />
      <Route exact path='/about' element = {<About />} />
     </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
