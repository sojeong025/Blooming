import { useEffect } from "react";
import classes from "./MyPageComponents.module.css";
import { AiOutlineRight } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const SettingList = ({ isCouple }) => {
  // 일단 share, choose-wedding 쓰던 페이지 재활용 하는데,
  // 맘에 안들면 그냥 만들기
  const settingLists = [
    { id: 1, name: "내 정보 수정", goTo: "edit-profile" },
    { id: 2, name: "상대방 연결", goTo: "share" },
    { id: 3, name: "결혼식 날짜 수정", goTo: "choose-wedding" },
    { id: 4, name: "알림 설정", goTo: "setting-notice" },
  ];
  const isMyCouple = isCouple;

  useEffect(() => {
    console.log(isMyCouple.toString());
  });

  return (
    <div className={classes.wrapper}>
      <ul className={classes.settingList}>
        {settingLists.map((item) => (
          <NavLink
            to={`/${item.goTo}`}
            // state={{ pageTitle: `${item.name}` }}
            state={{ isCouple }}
            key={item.id}
          >
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
