import { useRecoilValue } from "recoil";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
// import { useRecoilValueLoadable } from "recoil";
// import { fetchUserState } from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

import { NavLink } from "react-router-dom";

const ProfileBox = () => {
  const userData = useRecoilValue(userState);
  const coupleData = useRecoilValue(userCoupleState);

  return (
    <div className={classes.profile}>
      <div className={classes.user} style={{ border: "1px solid black" }}>
        {/* 연결했을 때는 두 명 안했으면 추가하라고 */}
        <div className={classes.me}>
          {/* 프로필 이미지 */}
          <img
            className={classes.profileImg}
            src={userData.profileImg}
            alt='profile'
          />
          {/* 가져온 유저 정보 */}
          <div>{userData.nickname}</div>
        </div>

        {/* 커플 유저 정보 */}
        {coupleData.name ? (
          <div className={classes.couple}>
            <img
              className={classes.profileImg}
              src={userData.profileImg}
              alt='profile'
            />
            <div>{coupleData.nickname}</div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div>
        {!coupleData.name ? (
          <NavLink to='/share'>상대방 연결해</NavLink>
        ) : (
          <></>
        )}
      </div>

      <NavLink to='/edit-profile' state={{ pageTitle: "정보 수정" }}>
        정보수정
      </NavLink>

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
