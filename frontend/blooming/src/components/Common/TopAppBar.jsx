import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as NoticeSvg } from "../../assets/Nav/bell.svg";
import { ReactComponent as NoticeOSvg } from "../../assets/Nav/bellO.svg";
import { ReactComponent as BackSvg } from "../../assets/Nav/back.svg";

import classes from "./TopAppBar.module.css";

import { useEffect, useState } from "react";

const TopAppBar = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    if (location.state && location.state.pageTitle) {
      setPageTitle(location.state.pageTitle);
    } else {
      setPageTitle("");
    }
  }, [location]);

  // 뒤로가기 필요하면 여기 넣기
  const backIcon = [
    "/all-notice",
    "/mobile-invitation",
    "/invitation-create",
    "/join-code",
    "/join",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
  ];

  // 알림버튼 없애려면 여기 넣기
  const noNotice = [
    "/join-code",
    "/join",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
  ];

  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(-1);
  };

  const isAllNotice = location.pathname === "/all-notice";
  // 색깔 바꿔줘
  const currentFill = isAllNotice ? "#ff0000" : "#000000";

  return (
    <header className={classes.header}>
      <div className={`${classes.navIcon} ${classes.navLeft}`}>
        <div onClick={handleHistory}>
          {backIcon.includes(location.pathname) && <BackSvg />}
        </div>
      </div>

      {/* 가운데 로고 또는 페이지타이틀 */}
      <div className={classes.pageTitleContainer}>
        {!pageTitle && <img src='src/assets/Nav/word.png' alt='Logo' />}
        {pageTitle}
      </div>

      {/* 알림창으로 이동 */}
      {noNotice.includes(location.pathname) ? (
        <div className={`${classes.navIcon} ${classes.navRight}`} />
      ) : (
        <NavLink to='/all-notice' state={{ pageTitle: "알림" }}>
          {/* 알림 아이콘 24x24에 맞춰 넣기 */}
          {/* 알림 없음 */}
          <NoticeSvg
            fill={currentFill}
            className={`${classes.navIcon} ${classes.navRight}`}
          />
          {/* 알림 있음 */}
          {/* <NoticeOSvg
            fill='#000000'
            className={`${classes.navIcon} ${classes.navRight}`}
          /> */}
        </NavLink>
      )}
    </header>
  );
};

export default TopAppBar;
