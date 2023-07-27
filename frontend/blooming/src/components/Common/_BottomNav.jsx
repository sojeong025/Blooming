import { NavLink } from "react-router-dom";
import classes from "./BottomNav.module.css";
import home from "../../assets/Nav/home.svg";
import info from "../../assets/Nav/info.svg";
import schedule from "../../assets/Nav/schedule.svg";
import diary from "../../assets/Nav/diary.svg";
import myPage from "../../assets/Nav/mypage.svg";

const BottomNav = () => {
  return (
    <nav className={classes.navContainer}>
      <div className={classes.navBlock}>
        <NavLink to='/home'>
          <img className={classes.navIcon} src={home} alt='' />
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
        <NavLink to='/myPage'>
          <img className={classes.navIcon} src={myPage} alt='' />
          <div className={classes.navTitle}>내정보</div>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
