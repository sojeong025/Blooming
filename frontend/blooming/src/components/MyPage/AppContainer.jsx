import { AiOutlineSchedule, AiOutlineStar } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import classes from "./MyPageComponents.module.css";
import { NavLink } from "react-router-dom";

const AppContainer = () => {
  const appItems = [
    { id: 1, name: "예약 현황", Icon: AiOutlineSchedule, goTo: "my-reservation" },
    { id: 2, name: "찜 목록", Icon: AiOutlineStar, goTo: "my-wishlist" },
    { id: 3, name: "나의 후기", Icon: MdOutlineRateReview, goTo: "my-review" },
  ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.appList}>
        {appItems.map((item) => (
          <NavLink to={`/${item.goTo}`} key={item.id}>
            <div className={classes.item}>
              <span className={classes.icon}>
                <item.Icon />
              </span>
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AppContainer;
