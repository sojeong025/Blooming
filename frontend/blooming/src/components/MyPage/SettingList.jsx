import classes from "./MyPageComponents.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SettingList = () => {
  const settingLists = [
    { id: 1, name: "내 정보 수정", goTo: "edit-profile" },
    { id: 2, name: "상대방 연결", goTo: "connect-couple" },
    { id: 3, name: "결혼식 날짜 수정", goTo: "edit-wedding" },
    { id: 4, name: "알림 설정", goTo: "setting-notice" },
  ];

  return (
    <div className={classes.wrapper}>
      <ul className={classes.settingList}>
        {settingLists.map((item) => (
          <NavLink to={`/${item.goTo}`} key={item.id}>
            <li className={classes.settingItem}>
              {item.name}
              <span className={classes.settingIcon}>
                <AiOutlineRight />
              </span>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SettingList;
