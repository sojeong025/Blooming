import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./BottomNav.module.css";

import homeBase from "../../assets/Nav/home_base.svg";
import homeActive from "../../assets/Nav/home_active.svg";
import infoBase from "../../assets/Nav/info_base.svg";
import infoActive from "../../assets/Nav/info_active.svg";
import scheduleBase from "../../assets/Nav/schedule_base.svg";
import scheduleActive from "../../assets/Nav/schedule_active.svg";
import diaryBase from "../../assets/Nav/diary_base.svg";
import diaryActive from "../../assets/Nav/diary_active.svg";
import myPageBase from "../../assets/Nav/mypage_base.svg";
import myPageActive from "../../assets/Nav/mypage_active.svg";

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // 1. 아이콘 밑에 글씨 넣기
  // 2. 아이콘만 넣고 페이지 명은 위에 적어주기

  return (
    <nav className={classes.navContainer}>
      <NavLink to='/home'>
        <div
          onClick={() => handleTabClick("home")}
          className={`${classes.navBlock} ${
            activeTab === "home" ? classes.active : ""
          }`}
        >
          <img
            className={classes.navIcon}
            src={activeTab === "home" ? homeActive : homeBase}
            alt=''
          />
          {/* <div className={classes.navTitle}>홈</div> */}
        </div>
      </NavLink>
      <NavLink to='/info'>
        <div
          onClick={() => handleTabClick("info")}
          className={`${classes.navBlock} ${
            activeTab === "info" ? classes.active : ""
          }`}
        >
          <img
            className={classes.navIcon}
            src={activeTab === "info" ? infoActive : infoBase}
            alt=''
          />
          <div className={classes.navTitle}>웨딩정보</div>
        </div>
      </NavLink>
      <NavLink to='/schedule'>
        <div
          onClick={() => handleTabClick("schedule")}
          className={`${classes.navBlock} ${
            activeTab === "schedule" ? classes.active : ""
          }`}
        >
          <img
            className={classes.navIcon}
            src={activeTab === "schedule" ? scheduleActive : scheduleBase}
            alt=''
          />
          <div className={classes.navTitle}>스케줄</div>
        </div>
      </NavLink>
      <NavLink to='/diary'>
        <div
          onClick={() => handleTabClick("diary")}
          className={`${classes.navBlock} ${
            activeTab === "diary" ? classes.active : ""
          }`}
        >
          <img
            className={classes.navIcon}
            src={activeTab === "diary" ? diaryActive : diaryBase}
            alt=''
          />
          <div className={classes.navTitle}>다이어리</div>
        </div>
      </NavLink>
      <NavLink to='/mypage'>
        <div
          onClick={() => handleTabClick("mypage")}
          className={`${classes.navBlock} ${
            activeTab === "mypage" ? classes.active : ""
          }`}
        >
          <img
            className={classes.navIcon}
            src={activeTab === "mypage" ? myPageActive : myPageBase}
            alt=''
          />
          <div className={classes.navTitle}>내정보</div>
        </div>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
