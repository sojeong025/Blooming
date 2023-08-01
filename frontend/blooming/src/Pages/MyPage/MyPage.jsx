import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";

import { NavLink } from "react-router-dom";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  return (
    <div
      className='mainContainer'
      style={{ marginLeft: "0px", marginRight: "0px" }}
    >
      {/* 프로필 */}
      <Profile />
      {/* 아이콘 컴포넌트 */}
      <div className={classes.IconContainer}>
        <IconBox icon={"icon1"} name={"찜목록"} />
        <IconBox icon={"icon3"} name={"예약현황"} />
        <IconBox icon={"icon2"} name={"내후기"} />
      </div>
      내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
      알림설정, 커플등록
      <div className={classes.SettingContainer}>
        <NavLink to='/setting'>
          <div>
            <p>설정</p>
            {/* 아이콘으로 바꾸기 */}
            <div>></div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default MyPage;
