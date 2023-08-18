import { AiOutlineSchedule, AiOutlineStar } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import classes from "./MyPageComponents.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const AppContainer = () => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/${item.goTo}`, { state: { pageTitle: `${item.name}` } });
  };
  const appItems = [
    {
      id: 1,
      name: "예약 현황",
      Icon: AiOutlineSchedule,
      goTo: "my-reservation",
    },
    {
      id: 2,
      name: "찜 목록",
      Icon: AiOutlineStar,
      goTo: "my-wishlist",
    },
    {
      id: 3,
      name: "나의 후기",
      Icon: MdOutlineRateReview,
      goTo: "my-review",
    },
  ];

  return (
    <div className={classes.wrapper}>
      <div className={classes.appList}>
        {appItems.map((item) => (
          <div
            className={classes.item}
            onClick={() => handleClick(item)}
            key={item.id}
          >
            <span className={classes.icon}>
              <item.Icon />
            </span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppContainer;
