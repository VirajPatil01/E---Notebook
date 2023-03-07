
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Notes from './components/Notes'
//About context Api this is the way to use any attribute or state at any stage of application and make easier instead of passing props at every atage of application 
//its like universal variable declaration

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (messaage, type) => {
    setAlert({
      msg: messaage,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }
  return (
    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
              <Route exact path="/about" element={<About/>}></Route>
              <Route exact path="/notes" element={<Notes showAlert={showAlert}/>}></Route>
              <Route exact path="/login" element={<Login  showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>

      </NoteState>
    </>
  );
}

export default App;
