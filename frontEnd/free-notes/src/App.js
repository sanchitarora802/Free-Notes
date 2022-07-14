import './App.css';
import Home from './components/home'
import Navbar from './components/navBar'
import About from './components/about'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
    <Navbar />
     <Routes>
      <Route exact path='/home' element = {<Home />} />
      <Route exact path='/about' element = {<About />} />
     </Routes>
    </Router>
    </>
  );
}

export default App;
