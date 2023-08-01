import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
// import { useRecoilValueLoadable } from "recoil";
// import { fetchUserState } from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

import { NavLink } from "react-router-dom";

const ProfileBox = () => {
  // 내 정보 받아오기
  // const loadable = useRecoilValueLoadable(fetchUserState);
  // switch (loadable.state) {
  //   case "loading":
  //     return <div>Loading...</div>;
  //   case "hasValue":
  //     const { profileImg, username, nickname, gender, coupleCode } =
  //       loadable.contents;
  //     return (
  //       <div>
  //         <img src={userProfileImg} alt='Profile' />
  //         <p>Username: {username}</p>
  //         <p>Nickname: {nickname}</p>
  //         <p>Gender: {gender}</p>
  //         <p>Couple Code: {coupleCode}</p>
  //       </div>
  //     );
  //   case "hasError":
  //   default:
  //     return <div>Error loading data</div>;
  // }

  // API가 없어서 일단 내 데이터
  const userData = useRecoilValue(userState);

  return (
    <div className={classes.profile}>
      <div className={classes.user} style={{ border: "1px solid black" }}>
        {/* 연결했을 때는 두 명 안했으면 추가하라고 */}
        {/* 프로필 이미지, 닉네임 */}
        <img
          className={classes.profileImg}
          src={userData.profileImg}
          alt='profile'
        />
        <div>{userData.nickname}</div>

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
