import { NavLink } from "react-router-dom";

import classes from "./Info.module.css";

function Info() {
  return (
    <div className='navContainer'>
      <nav className={classes.navContainer}>
        <NavLink to='/wedding-hall' state={{ pageTitle: "예식장" }}>
          <div>예식장</div>
        </NavLink>
        <NavLink to='/studio' state={{ pageTitle: "스튜디오" }}>
          <div>스튜디오</div>
        </NavLink>
        <NavLink to='/dress' state={{ pageTitle: "드레스" }}>
          <div>드레스</div>
        </NavLink>
        <NavLink to='/make-up' state={{ pageTitle: "메이크업" }}>
          <div>메이크업</div>
        </NavLink>
        <NavLink to='/mobile-invitation' state={{ pageTitle: "모바일청첩장" }}>
          <div>모바일청첩장</div>
        </NavLink>
      </nav>
    </div>
  );
}

export default Info;
