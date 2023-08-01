import React from "react";
import classes from "./MyPageComponents.module.css";
// import { ReactComponent as IconSvg } from `../../assets/Nav/${icon}.svg`;

const IconBox = ({ icon, name }) => {
  // const iconImg = `src/assets/MyPage/${icon}.img`;
  const IconSvg = React.lazy(() =>
    import(`../../assets/Nav/${icon}.svg`).then((module) => ({
      default: module.ReactComponent,
    })),
  );

  return (
    <div className={classes.iconBox}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <IconSvg className={classes.icon} />
      </React.Suspense>
      <div>{name}</div>
    </div>
  );
};

export default IconBox;
