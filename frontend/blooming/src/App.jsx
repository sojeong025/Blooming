import './App.css'
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from './Pages/Home'
import Login from './Pages/Login'
import Calendar from './Pages/Calendar';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <h1>
          Splash Screen
        </h1>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/Login">Login</NavLink></li>
          <li><NavLink to="/Calendar">Calendar</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Calendar" element={<Calendar />} />
        </Routes>
      </RecoilRoot>
    </Router>
  )
}

export default App
