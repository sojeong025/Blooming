import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";
import { userState, fetchUserState } from "../../recoil/ProfileAtom";

import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { errorModalState } from "../../recoil/ProfileAtom";
import ErrorModal from "../../components/Error/ErrorModal";
import { useEffect } from "react";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  const setUserState = useSetRecoilState(userState);
  // 일단 마이페이지에 들어왔을 때, 유저 데이터 조회
  const userData = useRecoilValue(fetchUserState);
  // 에러 모달
  // const setErrorModalVisible = useSetRecoilState(errorModalState);
  // const [isDataFetched, setIsDataFetched] = useState(false);

  // useEffect(() => {
  //   // 오직 데이터를 받아왔을 때만 userState에 저장하고 에러 모달을 표시
  //   if (isDataFetched) {
  //     if (userData && Object.keys(userData).length > 0) {
  //       setUserState(userData);
  //     } else {
  //       setErrorModalVisible(true);
  //     }
  //   }
  // }, [isDataFetched, userData, setUserState, setErrorModalVisible]);

  // useEffect(() => {
  //   setIsDataFetched(true);
  //   return () => {
  //     setIsDataFetched(false);
  //   };
  // }, []);

  return (
    <div
      className='mainContainer'
      style={{ marginLeft: "0px", marginRight: "0px" }}
    >
      {/* 에러 모달 표시 */}
      {/* {isErrorModalVisible && (
        <ErrorModal onClose={() => setErrorModalVisible(false)} />
      )} */}
      {/* 프로필 */}
      <Profile />
      {/* 아이콘 컴포넌트 */}
      <div className={classes.IconContainer}>
        <IconBox icon={"icon1"} name={"찜목록"} />
        <IconBox icon={"icon3"} name={"예약현황"} />
        <IconBox icon={"icon2"} name={"내후기"} />
      </div>
      내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
      알림설정( 이 되나? ), 커플 등록
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
