import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as NoticeSvg } from "../../assets/Nav/bell.svg";
import { ReactComponent as NoticeOSvg } from "../../assets/Nav/bellO.svg";
import { ReactComponent as BackSvg } from "../../assets/Nav/back.svg";

import classes from "./TopAppBar.module.css";
import { customAxios } from "../../lib/axios";

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

  // 왼쪽에 뒤로가기 필요하면 여기 넣기
  const backIcon = [
    "/all-notice",
    "/mobile-invitation",
    "/invitation-create",
    "/join-code",
    "/join",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
    "/edit-profile",
    "/setting-notice",
  ];

  // 알림버튼 없애려면 여기 넣기
  const noNotice = [
    "/join-code",
    "/join",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
    "/edit-profile",
  ];

  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(-1);
  };

  const isAllNotice = location.pathname === "/all-notice";
  // 알림창 활성화 색
  const currentFill = isAllNotice ? "#FF647C" : "#000000";
  // 알림이 있으면 true 없으면 false
  const [isNotice, setIsNotice] = useState(false);
  // 알림 있는 지 조회
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await customAxios.get("notification/unread-cnt");
        console.log(response);

        if (response.data.result[0] > 0) {
          setIsNotice(true);
        }
      } catch (error) {
        console.log("안 읽은 알림 조회 에러", error);
      }
    };

    fetchNotice();
  }, []);

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
          {isNotice ? (
            <NoticeOSvg
              fill={currentFill}
              className={`${classes.navIcon} ${classes.navRight}`}
            />
          ) : (
            <NoticeSvg
              fill={currentFill}
              className={`${classes.navIcon} ${classes.navRight}`}
            />
          )}
        </NavLink>
      )}
    </header>
  );
};

export default TopAppBar;
