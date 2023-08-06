import { AiOutlineSchedule, AiOutlineStar } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";
import classes from "./MyPageComponents.module.css";

const AppContainer = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.appList}>
        {appItems.map((item) => (
          <div className={classes.item} key={item.id}>
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

const appItems = [
  { id: 1, name: "예약 현황", Icon: AiOutlineSchedule },
  { id: 2, name: "찜 목록", Icon: AiOutlineStar },
  { id: 3, name: "나의 후기", Icon: MdOutlineRateReview },
];
