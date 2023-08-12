import { NavLink, Outlet } from "react-router-dom";

import classes from "./Info.module.css";

function Info() {
  return (
    <div>
      <nav className={classes.navContainer}>
        <NavLink to='/info/wedding-hall' state={{ productType: "HALL" }}>
          <div>웨딩홀</div>
        </NavLink>
        <NavLink to='/info/studio' state={{ productType: "STUDIO" }}>
          <div>스튜디오</div>
        </NavLink>
        <NavLink to='/info/dress' state={{ productType: "DRESS" }}>
          <div>드레스</div>
        </NavLink>
        <NavLink to='/info/make-up' state={{ productType: "MAKEUP" }}>
          <div>메이크업</div>
        </NavLink>
        <NavLink
          to='/info/mobile-invitation'
          state={{ pageTitle: "모바일청첩장" }}
        >
          <div>모바일청첩장</div>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Info;
