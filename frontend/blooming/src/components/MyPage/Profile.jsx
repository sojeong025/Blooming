import { useRecoilValue } from "recoil";
import {
  coupleRoleState,
  userCoupleState,
  userRoleState,
  userState,
} from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

const ProfileBox = ({ isCouple }) => {
  const userData = useRecoilValue(userState);
  const userRole = useRecoilValue(userRoleState);
  const coupleData = useRecoilValue(userCoupleState);
  const coupleRole = useRecoilValue(coupleRoleState);

  return (
    <div className={classes.profile}>
      {/* 프로필 사진이랑 이름 */}
      {!isCouple ? (
        // 커플
        <div className={`${classes.profileContainer} ${classes.Couple}`}>
          <div>
            <img
              className={`${classes.profileImg} ${classes.myImg}`}
              src={
                userData.profileImage
                  ? userData.profileImage
                  : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${userData.name}`
              }
              alt='profile'
            />
            <img
              className={`${classes.coupleProfile}`}
              src={
                coupleData.profileImage
                  ? coupleData.profileImage
                  : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${coupleData.name}`
              }
              alt='profile'
            />
          </div>

          <div className={classes.profileName}>
            <span>
              {userData.nickname}
              <br />
              {userRole}
            </span>
            <span>
              {coupleData.nickname}
              <br />
              {coupleRole}
            </span>
          </div>
        </div>
      ) : (
        // 혼자
        <div className={`${classes.profileContainer} ${classes.Alone}`}>
          <img
            className={classes.profileImg}
            src={
              userData.profileImage
                ? userData.profileImage
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
