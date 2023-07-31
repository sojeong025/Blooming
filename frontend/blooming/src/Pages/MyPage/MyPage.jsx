import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";

function MyPage() {
  return (
    <div className='mainContainer'>
      {/* 프로필 */}
      <Profile />
      {/* 결혼식 관련 */}

      {/* 아이콘 컴포넌트 */}
      <div className={classes.IconContainer}>
        <IconBox icon={"icon1"} name={"찜목록"} />
        <IconBox icon={"icon2"} name={"내후기"} />
        <IconBox icon={"icon3"} name={"예약현황"} />
      </div>

      <div className={classes.SettingContainer}>
        {/* 정보 수정 */}
        <div>정보 수정</div>
        {/* 환경설정 */}
        <div>환경서렂ㅇ</div>
        <div>개인정보취급방침</div>
        <div>머할까</div>
      </div>
    </div>
  );
}

export default MyPage;
