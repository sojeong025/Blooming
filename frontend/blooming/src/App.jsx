import './App.css'
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Splash from './Pages/Splash'
import Home from './Pages/Home'
import Login from './Pages/Login/Login'
import Schedule from './Pages/Schedule'
import Join from './Pages/Login/Join'
import Question from './Pages/Login/Question'
import DecideWedding from './Pages/Login/DecideWedding';
import ChooseWedding from './Pages/Login/ChooseWedding';
import Share from './Pages/Login/Share';
import AllNotice from './Pages/Notice/AllNotice';
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
          <li><NavLink to="/AllNotice">AllNotice</NavLink></li>
        </ul>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path='/Join' element={<Join />} />
          <Route path='/Question' element={<Question />} />
          <Route path='/DecideWedding' element={<DecideWedding />} />
          <Route path='/ChooseWedding' element={<ChooseWedding />} />
          <Route path='/Share' element={<Share />} />
          <Route path="/Schedule" element={<Schedule />} />
          <Route path="/AllNotice" element={<AllNotice />} />
        </Routes>
      </RecoilRoot>
    </Router>
  )
}

export default App
