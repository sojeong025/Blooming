import { NavLink, Outlet } from "react-router-dom";

import classes from "./Info.module.css";

function Info() {
  return (
    <div>
      <nav className={classes.navContainer}>
        <NavLink
          to='/info/wedding-hall'
          state={{ productType: "HALL", navAction: "info" }}
        >
          <div>웨딩홀</div>
        </NavLink>
        <NavLink
          to='/info/studio'
          state={{ productType: "STUDIO", navAction: "info" }}
        >
          <div>스튜디오</div>
        </NavLink>
        <NavLink
          to='/info/dress'
          state={{ productType: "DRESS", navAction: "info" }}
        >
          <div>드레스</div>
        </NavLink>
        <NavLink
          to='/info/make-up'
          state={{ productType: "MAKEUP", navAction: "info" }}
        >
          <div>메이크업</div>
        </NavLink>
        <NavLink
          to='/info/mobile-invitation'
          state={{ pageTitle: "모바일청첩장", navAction: "info" }}
        >
          <div>모바일청첩장</div>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default Info;
