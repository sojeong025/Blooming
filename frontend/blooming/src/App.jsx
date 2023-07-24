import './App.css'
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Splash from './Pages/Splash'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Schedule from './Pages/Schedule';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <ul>
          <li><NavLink to="/">Splash</NavLink></li>
          <li><NavLink to="/Home">Home</NavLink></li>
          <li><NavLink to="/Login">Login</NavLink></li>
          <li><NavLink to="/Schedule">Schedule</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Schedule" element={<Schedule />} />
        </Routes>
      </RecoilRoot>
    </Router>
  )
}

export default App
