import { NavLink, Outlet, useNavigate } from "react-router-dom";

import classes from "./Info.module.css";
import { useState } from "react";

function Info() {
  const [activePath, setActivePath] = useState("wedding-hall");
  const navigate = useNavigate();

  const handleNavClick = (path, state) => {
    setActivePath(path);
    navigate(`/info/${path}`, { state });
  };

  return (
    <div>
      <nav className={classes.navContainer}>
        <div
          className={`${classes.navItem} ${
            activePath === "wedding-hall" ? classes.active : ""
          }`}
          onClick={() =>
            handleNavClick("wedding-hall", {
              productType: "HALL",
              navAction: "info",
            })
          }
        >
          웨딩홀
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "studio" ? classes.active : ""
          }`}
          onClick={() =>
            handleNavClick("studio", {
              productType: "STUDIO",
              navAction: "info",
            })
          }
        >
          <div>스튜디오</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "dress" ? classes.active : ""
          }`}
          onClick={() =>
            handleNavClick("dress", {
              productType: "HALL",
              navAction: "info",
            })
          }
        >
          <div>드레스</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "make-up" ? classes.active : ""
          }`}
          onClick={() =>
            handleNavClick("make-up", {
              productType: "HALL",
              navAction: "info",
            })
          }
        >
          <div>메이크업</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "mobile-invitation" ? classes.active : ""
          }`}
          onClick={() =>
            handleNavClick("mobile-invitation", {
              productType: "HALL",
              navAction: "info",
            })
          }
        >
          <div>모바일청첩장</div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Info;
