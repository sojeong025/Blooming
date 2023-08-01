import classes from "./MyPage.module.css";

const SettingPage = () => {
  return (
    <div className='mainContainer'>
      <div className={classes.SettingContainer}>
        <p>설정</p>

        <div>
          <p>개인정보 수정</p>
          <div>></div>
        </div>
        <div>
          <p>알림설정</p>
          <div>></div>
        </div>
        <p>서비스</p>
        <div>
          <p>이용약관</p>
          <div>></div>
        </div>
        <div>
          <p>방침</p>
          <div>></div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
