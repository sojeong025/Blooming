import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Modal from "./components/Error/Modal";

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
// Home
import Home from "./Pages/Home";
import Magazine from "./Pages/Home/Magazine";
// schedule
import Schedule from "./Pages/Schedule";
import TaskDetail from "./Pages/Schedule/TaskDetail";
import NewTask from "./Pages/Schedule/NewTask";
// my-page
import MyPage from "./Pages/MyPage/MyPage";
import SettingNotice from "./Pages/MyPage/SettingNotice";
import EditProfile from "./Pages/MyPage/EditProfile";
import MyReservation from "./components/MyPage/MyReservation";
import MyReview from "./components/MyPage/MyReview";
import MyWishlist from "./components/MyPage/MyWishlist";
// diary
import DiaryExplain from "./Pages/Diary/DiaryExplain";
import Diary from "./Pages/Diary/Diary";
import DiaryDetails from "./Pages/Diary/DiaryDetails";
// info
import Info from "./Pages/Info/Info";
import WeddingHall from "./Pages/Info/WeddingHall";
import Studio from "./Pages/Info/Studio";
import Dress from "./Pages/Info/Dress";
import MakeUp from "./Pages/Info/MakeUp";
import InfoDetail from "./Pages/Info/InfoDetail";
import MobileInvitation from "./Pages/Info/MobileInvitation";
import MobileInvitationDetail from "./Pages/Info/MobileInvitationDetail";
import MobileInvitationShare from "./Pages/Info/MobileInvitationShare";
import Create from "./Pages/Info/Create";
// notice
import AllNotice from "./Pages/Notice/AllNotice";
// err
import Error from "./Pages/Error";
// QR
import QrCode from "./Pages/QrCode";

function App() {
  // TopNav를 숨길 페이지 path
  const hiddenTopPaths = [
    "/",
    "/kakaologin",
    "/login",
    "/go-join",
    "/join",
    "/mobile-invitation-detail",
    "/schedule/new-task",
    "/qrcode",
    "/mobile-invitation-detail/:id",
  ];
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
    "/invitation-create",
    "/mobile-invitation-detail",
    "/schedule/new-task",
    "/qrcode",
    "/mobile-invitation-detail/:id",
  ];

  // 동적 경로
  const dynamicRoutes = [
    {
      regex: /^\/[^/]+\/\d+$/,
      path: (productType, id) => `/${productType}/${id}`,
    },
  ];
  // 동적 경로 확인을 위한 함수
  const isDynamicPath = (path) => {
    return dynamicRoutes.some((route) => route.regex.test(path));
  };

  const Routing = () => {
    const location = useLocation();
    const shouldHiddenBottom =
      hiddenBottomPaths.includes(location.pathname) ||
      isDynamicPath(location.pathname);

    useEffect(() => {
      function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      setScreenSize();
    }, []);

    return (
      <>
        {!hiddenTopPaths.includes(location.pathname) && <TopAppBar />}
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/all-notice' element={<AllNotice />} />
          {/* home */}
          <Route path='/home' element={<Home />} />
          <Route path='/magazine/:id' element={<Magazine />} />

          {/* login */}
          <Route path='/login' element={<Login />} />
          <Route path='/kakaologin' element={<KakaoLogin />} />
          <Route path='/go-join' element={<GoJoin />} />
          {/* <Route path='/join-code' element={<JoinCode />} /> */}
          <Route path='/join' element={<Join />} />
          {/* <Route path='/question' element={<Question />} /> */}
          {/* <Route path='/decide-wedding' element={<DecideWedding />} /> */}
          <Route path='/choose-wedding' element={<ChooseWedding />} />
          <Route path='/share' element={<Share />} />
          {/* 웨딩정보 */}
          <Route path='/info' element={<Info />}>
            <Route path='wedding-hall' element={<WeddingHall />} />
            <Route path='studio' element={<Studio />} />
            <Route path='dress' element={<Dress />} />
            <Route path='make-up' element={<MakeUp />} />
            <Route path='mobile-invitation' element={<MobileInvitation />} />
          </Route>
          <Route path=':productType/:id' element={<InfoDetail />} />
          <Route
            path='/mobile-invitation-detail'
            element={<MobileInvitationDetail />}
          />
          <Route
            path='/mobile-invitation-detail/:id'
            element={<MobileInvitationShare />}
          />
          <Route path='/invitation-create' element={<Create />} />

          {/* 다이어리 */}
          <Route path='/diary' element={<Diary />} />
          <Route path='/diary/:id' element={<DiaryDetails />} />
          <Route path='/diary-explain' element={<DiaryExplain />} />

          {/* 마이페이지 */}
          <Route path='/my-page' element={<MyPage />} />
          <Route path='/setting-notice' element={<SettingNotice />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/my-wishlist' element={<MyWishlist />} />
          <Route path='/my-review' element={<MyReview />} />
          <Route path='/my-reservation' element={<MyReservation />} />

          {/* 스케줄 */}
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/schedule/:id' element={<TaskDetail />} />
          <Route path='/schedule/new-task' element={<NewTask />} />

          {/* QR Code */}
          <Route path='/qrcode' element={<QrCode />} />
          {/* NotFound */}
          <Route path='*' element={<Error />} />
        </Routes>
        {!shouldHiddenBottom && <BottomNav />}
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
