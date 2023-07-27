import { NavLink } from "react-router-dom";

import "./TopAppBar.css";
// import logo from "./logo.png"; // 로고 이미지 파일 경로로 변경해 주세요
// import notificationsIcon from "./notifications.png"; // 알림 아이콘 파일 경로로 변경해 주세요

const TopAppBar = () => {
  return (
    <header className='header'>
      <img src='' alt='Logo' className='logo' />
      {/* <div className='spacer' /> */}
      <NavLink to='/notice'>알림</NavLink>
    </header>
  );
};

export default TopAppBar;
