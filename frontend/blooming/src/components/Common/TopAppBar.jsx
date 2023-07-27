import { NavLink } from "react-router-dom";

import classes from "./TopAppBar.module.css";

import noticeBase from "../../assets/Nav/notice_base.svg";
import noticeActive from "../../assets/Nav/notice_active.svg";

const TopAppBar = () => {
  return (
    <header className={classes.header}>
      <img src='' alt='Logo' className={classes.logo} />

      <NavLink to='/AllNotice' className={classes.rightLink}>
        <div className={classes.navBlock}>
          <img
            className={classes.navIcon}
            // activeClassName에 의해 이미지 소스 변경
            src={
              window.location.pathname === "/AllNotice"
                ? noticeActive
                : noticeBase
            }
            alt=''
          />
          <div className={classes.navTitle}>알림</div>
        </div>
      </NavLink>
    </header>
  );
};

export default TopAppBar;
