import { NavLink } from "react-router-dom";
import "./BottomNav.css";

const BottomNav = () => {
  return (
    <nav className='bottom-nav'>
      <div>
        <NavLink to='/'>홈</NavLink>
      </div>
      <div>
        <NavLink to='/info'>정보</NavLink>
      </div>
      <div>
        <NavLink to='/schedule'>캘린더</NavLink>
      </div>
      <div>
        <NavLink to='/diary'>다이어리</NavLink>
      </div>
      <div>
        <NavLink to='/myPage'>마이페이지</NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
