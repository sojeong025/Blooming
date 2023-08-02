import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
// import { useRecoilValueLoadable } from "recoil";
// import { fetchUserState } from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

import { NavLink } from "react-router-dom";

const ProfileBox = () => {
  const userData = useRecoilValue(userState);

  return (
    <div className={classes.profile}>
      <div className={classes.user} style={{ border: "1px solid black" }}>
        {/* 연결했을 때는 두 명 안했으면 추가하라고 */}
        {/* 프로필 이미지 */}
        <img
          className={classes.profileImg}
          src={userData.profileImg}
          alt='profile'
        />
        {/* 가져온 유저 정보 */}
        <div>{userData.email}</div>
        <div>{userData.gender}</div>
        <div>{userData.name}</div>
        <div>{userData.nickname}</div>
        <div>{userData.phoneNumber}</div>

        <NavLink to='/edit-profile'>
          <div>정보수정</div>
        </NavLink>

        <button>초대안했으면 초대해 버튼</button>
      </div>

      <div
        className={`${classes.weddingContainer}`}
        style={{ border: "1px solid blue" }}
      >
        {/* 결혼식 관련 */}
        <div>결혼식날짜랑 디데이</div>
      </div>
    </div>
  );
};

export default ProfileBox;
