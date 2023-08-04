import { NavLink, useLocation } from "react-router-dom";
import classes from "./BottomNav.module.css";
import { ReactComponent as HomeSvg } from "../../assets/Nav/home.svg";

import home from "../../assets/Nav/home_base.svg";
import info from "../../assets/Nav/info_base.svg";
import schedule from "../../assets/Nav/schedule_base.svg";
import diary from "../../assets/Nav/diary_base.svg";
import myPage from "../../assets/Nav/mypage_base.svg";

const BottomNav = () => {
  const location = useLocation();

  // 해당 페이지 속에 파생된 모든 페이지 넣어야함

  const isHome = location.pathname === "/home";
  // // 색깔 바꿔줘
  const currentFill = isHome ? "#FF647C" : "#000000";

  return (
    <nav className={classes.navContainer}>
      <div className={classes.navBlock}>
        <NavLink to='/home'>
          <HomeSvg className={classes.navIcon} fill={currentFill} />
          {/* <img className={classes.navIcon} src={home} alt='' /> */}
          <div className={classes.navTitle}>홈</div>
        </NavLink>
      </div>
      <div className={classes.navBlock}>
        <NavLink to='/info'>
          <img className={classes.navIcon} src={info} alt='' />
          <div className={classes.navTitle}>정보</div>
        </NavLink>
      </div>
      <div className={classes.navBlock}>
        <NavLink to='/schedule'>
          <img className={classes.navIcon} src={schedule} alt='' />
          <div className={classes.navTitle}>캘린더</div>
        </NavLink>
      </div>
      <div className={classes.navBlock}>
        <NavLink to='/diary'>
          <img className={classes.navIcon} src={diary} alt='' />
          <div className={classes.navTitle}>다이어리</div>
        </NavLink>
      </div>
      <div className={classes.navBlock}>
        <NavLink to='/my-page'>
          <img className={classes.navIcon} src={myPage} alt='' />
          <div className={classes.navTitle}>내정보</div>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
