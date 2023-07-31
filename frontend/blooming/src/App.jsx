import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import KakaoLogin from "./Pages/Login/KakaoLogin";
import Schedule from "./Pages/Schedule";
import Join from "./Pages/Login/Join";
import Question from "./Pages/Login/Question";
import DecideWedding from "./Pages/Login/DecideWedding";
import ChooseWedding from "./Pages/Login/ChooseWedding";
import Share from "./Pages/Login/Share";
import MyPage from "./Pages/MyPage/MyPage";
import Diary from "./Pages/Diary/DIary";
import Info from "./Pages/Info/Info";
import MobileInvitation from "./Pages/Info/MobileInvitation";
import AllNotice from "./Pages/Notice/AllNotice";
import TopAppBar from "./components/Common/TopAppBar";
import BottomNav from "./components/Common/BottomNav";
import { useEffect } from "react";

function App() {
  // Nav를 숨길 페이지 path
  const hiddenPaths = [
    "/",
    "/login",
    "/join",
    "/Question",
    "/DecideWedding",
    "/ChooseWedding",
    "/Share",
  ];

  const Routing = () => {
    function setScreenSize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    useEffect(() => {
      setScreenSize();
    });

    const location = useLocation();
    return (
      <>
        {!hiddenPaths.includes(location.pathname) && <TopAppBar />}

        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/login' element={<Login />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/join' element={<Join />} />
          <Route path='/Question' element={<Question />} />
          <Route path='/DecideWedding' element={<DecideWedding />} />
          <Route path='/ChooseWedding' element={<ChooseWedding />} />
          <Route path='/Share' element={<Share />} />
          <Route path='/Info' element={<Info />} />
          <Route path='/Diary' element={<Diary />} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/AllNotice' element={<AllNotice />} />
          <Route path='/home' element={<Home />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/MobileInvitation' element={<MobileInvitation />} />
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
