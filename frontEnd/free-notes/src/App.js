import './App.css';
import Home from './components/home'
import Navbar from './components/navBar'
import About from './components/about'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from './contexts/notes/noteState';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
     <Routes>
      <Route exact path='/home' element = {<Home />} />
      <Route exact path='/about' element = {<About />} />
     </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
