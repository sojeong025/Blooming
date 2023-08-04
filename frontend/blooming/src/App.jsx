import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

// Pages
import Splash from "./Pages/Splash";
// login
import Login from "./Pages/Login/Login";
import KakaoLogin from "./Pages/Login/KakaoLogin";
import GoJoin from "./Pages/Login/Gojoin";
import JoinCode from "./Pages/Login/JoinCode";
import Join from "./Pages/Login/Join";
import Question from "./Pages/Login/Question";
import DecideWedding from "./Pages/Login/DecideWedding";
import ChooseWedding from "./Pages/Login/ChooseWedding";
import Share from "./Pages/Login/Share";
// common
import TopAppBar from "./components/Common/TopAppBar";
import BottomNav from "./components/Common/BottomNav";
import Home from "./Pages/Home";
// schedule
import Schedule from "./Pages/Schedule";
// my-page
import MyPage from "./Pages/MyPage/MyPage";
import SettingPage from "./Pages/MyPage/SettingPage";
import EditProfile from "./Pages/MyPage/EditProfile";
// diary
import Diary from "./Pages/Diary/Diary";
import DiaryDetails from "./Pages/Diary/DiaryDetails";
// info
import Info from "./Pages/Info/Info";
import MobileInvitation from "./Pages/Info/MobileInvitation";
import MobileInvitationDetail from "./Pages/Info/MobileInvitationDetail";
import Create from "./Pages/Info/Create";
// notice
import AllNotice from "./Pages/Notice/AllNotice";
// err
import Error from "./Pages/Error";

function App() {
  // Nav를 숨길 페이지 path
  const hiddenPaths = ["/", "/login", "/GoJoin", "/Question", "/Share"];

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
          <Route path='/GoJoin' element={<GoJoin />} />
          <Route path='/join-code' element={<JoinCode />} />

          <Route path='/join' element={<Join />} />
          <Route path='/Question' element={<Question />} />
          <Route path='/DecideWedding' element={<DecideWedding />} />
          <Route path='/ChooseWedding' element={<ChooseWedding />} />
          <Route path='/Share' element={<Share />} />
          <Route path='/Info' element={<Info />} />
          <Route path='/Diary' element={<Diary />} />
          <Route path='/Diary/:id' element={<DiaryDetails />} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/setting' element={<SettingPage />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/AllNotice' element={<AllNotice />} />
          <Route path='/home' element={<Home />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/MobileInvitation' element={<MobileInvitation />} />
          <Route path='/MobileInvitationDetail' element={<MobileInvitationDetail />} />
          <Route path='/Create' element={<Create />} />

          {/* NotFound */}
          <Route path='*' element={<Error />} />
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
