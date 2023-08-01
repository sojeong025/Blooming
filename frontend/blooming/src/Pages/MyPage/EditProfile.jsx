import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";
import { useState } from "react";

const EditProfile = () => {
  const [userData, setUserData] = useRecoilState(userState);

  return (
    <div className={`mainContainer ${classes.EditContainer}`}>
      <div>
        이거는 알림 버튼에 바꿀까 수정용 앱바를 만들어야겠어
        뒤로가기-회원정보수정-완료버튼
      </div>
      <div className={classes.profileImg}>
        <img src={userData.profileImg} alt='' />
      </div>
      <div>이름</div>
      <input type='text' />
      <div>닉네임</div>
      <input type='text' />
      <label htmlFor=''>이메일</label>
      <input type='text' />
      <div>초대코드 보여줄까</div>
      <div>또뭐잇징</div>
    </div>
  );
};
export default EditProfile;
