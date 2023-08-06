import { styled } from "styled-components";
import classes from "./MyPageComponents.module.css";
import { AiOutlineRight } from "react-icons/ai";

const SettingList = () => {
  return (
    <div className={classes.wrapper}>
      <ul className={classes.settingList}>
        {settingLists.map((item) => (
          <li className={classes.settingItem} key={item.id}>
            {item.name}
            <span className={classes.settingIcon}>
              <AiOutlineRight />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingList;
{
  /* 
      내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
      알림설정( 이 되나? ), 커플 등록
      <div className={classes.SettingContainer}>
        <NavLink to='/edit-profile' state={{ pageTitle: "정보 수정" }}>
          <div>내 정보 관리</div>
        </NavLink>
        <NavLink to='/setting'>
          <div>
            <p>설정</p>
            <div>화살표로바꿈</div>
          </div>
        </NavLink>
      </div> */
}

const settingLists = [
  { id: 1, name: "내 정보 수정" },
  { id: 2, name: "상대방 연결" },
  { id: 3, name: "결혼식 날짜 수정" },
  { id: 4, name: "알림 설정" },
];
