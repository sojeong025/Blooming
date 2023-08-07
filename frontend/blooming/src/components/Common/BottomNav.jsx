import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./BottomNavAni.module.css";

import { useRecoilState } from "recoil";
import { navStateAtom } from "../../recoil/NavAtom";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { ReactComponent as Info } from "../../assets/Nav/info_base.svg";
import { ReactComponent as Schedule } from "../../assets/Nav/schedule_base.svg";
import { ReactComponent as Diary } from "../../assets/Nav/diary_base.svg";
// import { ReactComponent as MyPage } from "../../assets/Nav/mypage_base.svg";

const BottomNav = () => {
  // 모든 페이지 다 설정하고 나면
  // location state에 activeTab을 넣어서 그거 맞춰서 해도 될듯
  // 그러면 네브 탭 내부로 접근해도 active 유지되나????
  // 몰겠어 새로고침 안한다고 가정하자

  const [selectedMenu, setSelectedMenu] = useRecoilState(navStateAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 효과 후 페이지 이동
  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 350); // 애니메이션 지속 시간 설정
    setSelectedMenu(path.slice(1));
  };

  // 1. 아이콘 밑에 글씨 넣기
  // 2. 아이콘만 넣고 페이지 명은 위에 적어주기
  return (
    <>
      <div className={classes.navTop}></div>
      <nav>
        <input
          type='radio'
          id='item-1'
          name='menu'
          defaultChecked={
            (selectedMenu === "home") | (location.pathname.slice(1) === "home")
          }
          className={classes.item1}
        />
        <label htmlFor='item-1' onClick={() => handleNavigation("/home")}>
          <span>
            <AiOutlineHome />
          </span>
        </label>

        <input
          type='radio'
          id='item-2'
          name='menu'
          defaultChecked={
            (selectedMenu === "info") | (location.pathname.slice(1) === "info")
          }
          className={classes.item2}
        />
        <label
          htmlFor='item-2'
          onClick={() => handleNavigation("/info/wedding-hall")}
        >
          <span>
            <Info />
          </span>
        </label>

        <input
          type='radio'
          id='item-3'
          name='menu'
          defaultChecked={
            (selectedMenu === "schedule") |
            (location.pathname.slice(1) === "schedule")
          }
          className={classes.item3}
        />
        <label htmlFor='item-3' onClick={() => handleNavigation("/schedule")}>
          <span>
            <Schedule />
          </span>
        </label>

        <input
          type='radio'
          id='item-4'
          name='menu'
          defaultChecked={
            (selectedMenu === "diary") |
            (location.pathname.slice(1) === "diary")
          }
          className={classes.item4}
        />
        <label htmlFor='item-4' onClick={() => handleNavigation("/diary")}>
          <span>
            <Diary />
          </span>
        </label>

        <input
          type='radio'
          id='item-5'
          name='menu'
          defaultChecked={
            (selectedMenu === "my-page") |
            (location.pathname.slice(1) === "my-page")
          }
          className={classes.item5}
        />
        <label htmlFor='item-5' onClick={() => handleNavigation("/my-page")}>
          <span>
            <AiOutlineUser />
          </span>
        </label>

        <div className={classes.cursor}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 18.625 18.625'
            height='19.867'
            width='19.867'
          >
            <path
              d='M0 0v18.625C.459 6.493 7.17.804 18.625 0z'
              fillRule='evenodd'
            />
          </svg>

          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 18.625 18.625'
            height='19.867'
            width='19.867'
          >
            <path
              d='M0 0v18.625C.459 6.493 7.17.804 18.625 0z'
              fillRule='evenodd'
            />
          </svg>
        </div>
      </nav>
    </>
  );
};

export default BottomNav;
