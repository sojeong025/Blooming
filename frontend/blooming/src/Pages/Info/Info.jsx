import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

import classes from "./Info.module.css";
import { useEffect, useState } from "react";

function Info() {
  const location = useLocation();
  const initialActivePath = location.pathname.split("/")[2] || "wedding-hall";
  const [activePath, setActivePath] = useState(initialActivePath);
  const [subNavAction, setSubNavAction] = useState("");

  const navigate = useNavigate();

  const handleNavClick = (path, state) => {
    setActivePath(path);
    setSubNavAction(state.subNavAction);
    navigate(`/info/${path}`, { state });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  return (
    <div>
      <nav className={classes.navContainer}>
        <div
          className={`${classes.navItem} ${
            activePath === "wedding-hall" || subNavAction === "wedding-hall"
              ? classes.active
              : ""
          }`}
          onClick={() =>
            handleNavClick("wedding-hall", {
              productType: "HALL",
              navAction: "info",
              subNavAction: "wedding-hall",
            })
          }
        >
          웨딩홀
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "studio" || subNavAction === "studio"
              ? classes.active
              : ""
          }`}
          onClick={() =>
            handleNavClick("studio", {
              productType: "STUDIO",
              navAction: "info",
              subNavAction: "studio",
            })
          }
        >
          <div>스튜디오</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "dress" || subNavAction === "dress"
              ? classes.active
              : ""
          }`}
          onClick={() =>
            handleNavClick("dress", {
              productType: "DRESS",
              navAction: "info",
              subNavAction: "dress",
            })
          }
        >
          <div>드레스</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "make-up" || subNavAction === "dress"
              ? classes.active
              : ""
          }`}
          onClick={() =>
            handleNavClick("make-up", {
              productType: "MAKEUP",
              navAction: "info",
              subNavAction: "make-up",
            })
          }
        >
          <div>메이크업</div>
        </div>
        <div
          className={`${classes.navItem} ${
            activePath === "mobile-invitation" ||
            subNavAction === "mobile-invitation"
              ? classes.active
              : ""
          }`}
          onClick={() =>
            handleNavClick("mobile-invitation", {
              productType: "mobile-invitation",
              navAction: "info",
              subNavAction: "mobile-invitation",
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
