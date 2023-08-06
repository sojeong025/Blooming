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
import SettingNotice from "./Pages/MyPage/SettingNotice";
import EditProfile from "./Pages/MyPage/EditProfile";
// diary
import Diary from "./Pages/Diary/Diary";
import DiaryDetails from "./Pages/Diary/DiaryDetails";
// info
import Info from "./Pages/Info/Info";
import WeddingHall from "./Pages/Info/WeddingHall";
import Studio from "./Pages/Info/Studio";
import Dress from "./Pages/Info/Dress";
import MakeUp from "./Pages/Info/MakeUp";
import MobileInvitation from "./Pages/Info/MobileInvitation";
import MobileInvitationDetail from "./Pages/Info/MobileInvitationDetail";
import Create from "./Pages/Info/Create";
// notice
import AllNotice from "./Pages/Notice/AllNotice";
// err
import Error from "./Pages/Error";

function App() {
  // BottomNav를 숨길 페이지 path
  const hiddenTopPaths = ["/", "/kakaologin", "/login"];
  // BottomNav를 숨길 페이지 path
  const hiddenBottomPaths = [
    "/",
    "/kakaologin",
    "/login",
    "/go-join",
    "/join",
    "/join-code",
    "/question",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
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
        {!hiddenTopPaths.includes(location.pathname) && <TopAppBar />}
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/home' element={<Home />} />
          <Route path='/all-notice' element={<AllNotice />} />

          {/* login */}
          <Route path='/login' element={<Login />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/go-join' element={<GoJoin />} />
          <Route path='/join-code' element={<JoinCode />} />
          <Route path='/join' element={<Join />} />
          <Route path='/question' element={<Question />} />
          <Route path='/decide-wedding' element={<DecideWedding />} />
          <Route path='/choose-wedding' element={<ChooseWedding />} />
          <Route path='/share' element={<Share />} />

          {/* 웨딩정보 */}
          <Route path='/info' element={<Info />} />
          <Route path='/wedding-hall' element={<WeddingHall />} />
          <Route path='/studio' element={<Studio />} />
          <Route path='/dress' element={<Dress />} />
          <Route path='/make-up' element={<MakeUp />} />
          <Route path='/mobile-invitation' element={<MobileInvitation />} />
          <Route
            path='/mobile-invitation-detail'
            element={<MobileInvitationDetail />}
          />
          <Route path='/invitation-create' element={<Create />} />

          {/* 다이어리 */}
          <Route path='/diary' element={<Diary />} />
          <Route path='/diary/:id' element={<DiaryDetails />} />

          {/* 마이페이지 */}
          <Route path='/my-page' element={<MyPage />} />
          <Route path='/setting-notice' element={<SettingNotice />} />
          <Route path='/edit-profile' element={<EditProfile />} />

          {/* 스케줄 */}
          <Route path='/schedule' element={<Schedule />} />

          {/* NotFound */}
          <Route path='*' element={<Error />} />
        </Routes>

        {!hiddenBottomPaths.includes(location.pathname) && <BottomNav />}
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
