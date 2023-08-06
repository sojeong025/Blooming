import { useRecoilValue } from "recoil";
import {
  userCoupleState,
  userRoleState,
  userState,
} from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

import { NavLink } from "react-router-dom";
import { weddingDateState, weddingDdayCal } from "../../recoil/WeddingDdayAtom";

const ProfileBox = ({ isCouple, isChooseDate }) => {
  const userData = useRecoilValue(userState);
  const coupleData = useRecoilValue(userCoupleState);
  const userRole = useRecoilValue(userRoleState);

  const WeddingDate = useRecoilValue(weddingDateState);
  const WeddingDday = useRecoilValue(weddingDdayCal);

  return (
    <div className={classes.profile}>
      {/* 프로필 사진이랑 이름 */}
      {isCouple ? (
        // 커플
        <div className={classes.profileContainer}>
          <h1>커플 {isCouple.toString()}</h1>
        </div>
      ) : (
        // 혼자
        <div className={classes.profileContainer}>
          <img
            className={classes.ProfileImg}
            src={
              userData.profileImg
                ? userData.profileImg
                : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${userData.name}`
            }
            alt='profile'
          />
          <div className={classes.profileName}>
            {userData.nickname} {userRole}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
