import "./App.css";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Schedule from "./Pages/Schedule";

import BottomNav from "./components/Common/BottomNav";
import TopAppBar from "./components/Common/TopAppBar";

function App() {
  // Nav를 숨길 페이지 path
  const hiddenPaths = ["/splash", "/login"];

  const Routing = () => {
    const location = useLocation();

    return (
      <>
        <TopAppBar />
        <Routes>
          <Route path='/splash' element={<Splash />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<Home />} />
          <Route path='/schedule' element={<Schedule />} />
        </Routes>
        {!hiddenPaths.includes(location.pathname) && <BottomNav />}
      </>
    );
  };

  return (
    <Router>
      <RecoilRoot>
        <Routing />
      </RecoilRoot>
    </Router>
  );
}

export default App;
