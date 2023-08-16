import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as NoticeSvg } from "../../assets/Nav/bell.svg";
import { ReactComponent as NoticeOSvg } from "../../assets/Nav/bellO.svg";
import { ReactComponent as BackSvg } from "../../assets/Nav/back.svg";

import classes from "./TopAppBar.module.css";
import { customAxios } from "../../lib/axios";

import { useEffect, useState } from "react";

const TopAppBar = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState();

  useEffect(() => {
    console.log(location);
    if (location.state && location.state.pageTitle) {
      setPageTitle(location.state.pageTitle);
    } else {
      setPageTitle("");
    }
  }, [location]);

  // 왼쪽에 뒤로가기 필요하면 여기 넣기
  const backRoutes = [
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
    "/my-reservation",
    "/my-wishlist",
    "/my-review",
  ];

  // 동적 경로
  const dynamicBackRoutes = [
    {
      regex: /^\/[^/]+\/\d+$/,
      path: (productType, id) => `/${productType}/${id}`,
    },
  ];

  // 동적 경로 확인을 위한 함수
  const isDynamicPath = (path) => {
    return dynamicBackRoutes.some((route) => route.regex.test(path));
  };
  const shouldDisplayBackIcon =
    backRoutes.includes(location.pathname) || isDynamicPath(location.pathname);

  // 알림버튼 없애려면 여기 넣기
  const noNotice = [
    "/go-join",
    "/join-code",
    "/join",
    "/decide-wedding",
    "/choose-wedding",
    "/share",
    "/edit-profile",
    "/all-notice",
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
        // console.log(response);
        if (response.data.result[0] > 0) {
          setIsNotice(true);
        }
      } catch (error) {
        // console.log("안 읽은 알림 조회 에러", error);
      }
    };
    fetchNotice();
  }, [location]);

  return (
    <header className={classes.header}>
      <div className={`${classes.navIcon} ${classes.navLeft}`}>
        <div onClick={handleHistory}>
          {/* {backRoutes.includes(location.pathname) && <BackSvg />} */}
          {shouldDisplayBackIcon && <BackSvg />}
        </div>
      </div>

      {/* 가운데 로고 또는 페이지타이틀 */}
      <div className={classes.pageTitleContainer}>
        {/* {!pageTitle && <img src='src/assets/Nav/word.png' alt='Logo' />} */}
        {!pageTitle ? (
          <img src='/public/word.png' alt='Logo' />
        ) : (
          <>{pageTitle}</>
        )}
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
