import { useRecoilValue } from "recoil";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
// import { useRecoilValueLoadable } from "recoil";
// import { fetchUserState } from "../../recoil/ProfileAtom";
import classes from "./MyPageComponents.module.css";

import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { AiOutlineSchedule, AiOutlineStar } from "react-icons/ai";
import { MdOutlineRateReview } from "react-icons/md";

const ProfileBox = ({ isCouple, isChooseDate }) => {
  const userData = useRecoilValue(userState);
  const coupleData = useRecoilValue(userCoupleState);

  return (
    <div className={classes.profile}>
      {/* 프로필 사진이랑 이름 */}
      {isCouple ? (
        // 커플
        <CoupleProfile>
          {/* 프로필 이미지 */}
          <h1>커플 {isCouple.toString()}</h1>
        </CoupleProfile>
      ) : (
        // 혼자
        <AloneProfile>
          <Header>
            <ProfileImg
              src={
                userData.profileImg
                  ? userData.profileImg
                  : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${userData.name}`
              }
              alt='profile'
            />
            <Name>{userData.nickname}</Name>
          </Header>
        </AloneProfile>
      )}
      {/* 결혼 관련 */}
      <div
        className={`${classes.weddingContainer}`}
        style={{ border: "1px solid blue" }}
      >
        {/* 결혼식 관련 */}
        <div>결혼식날짜랑 디데이</div>
      </div>

      <AppContainer>
        <MenuListContainer>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
              <IconWrapper>
                <item.Icon />
              </IconWrapper>
              {item.name}
            </MenuItem>
          ))}
        </MenuListContainer>
      </AppContainer>
    </div>
  );
};

export default ProfileBox;

const CoupleProfile = styled.div`
  display: block;
  border: blue solid 1px;
`;
const AloneProfile = styled.div`
  display: block;
  border: red solid 1px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 1.5rem 0;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1rem;
`;

const Name = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
`;
const menuItems = [
  { id: 1, name: "예약 현황", Icon: AiOutlineSchedule },
  { id: 2, name: "나의 리뷰", Icon: AiOutlineStar },
  { id: 3, name: "나의 후기", Icon: MdOutlineRateReview },
];
// 컴포넌트
const MenuListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin: 1rem 0;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 1 33.333%;
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const IconWrapper = styled.span`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;
// list
// const MenuListContainer = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;
// const MenuItem = styled.li`
//   display: flex;
//   align-items: center;
//   padding: 1rem;
//   border-bottom: 1px solid #ddd;
//   font-size: 1.2rem;
//   color: #666;
// `;
// const IconWrapper = styled.span`
//   margin-right: 0.5rem;
// `;
const AppContainer = styled.div`
  max-width: 480px;
  margin: auto;
  background-color: #f8f8f8;
  background-image: url("/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
