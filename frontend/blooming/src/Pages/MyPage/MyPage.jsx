import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";
import { useCallback, useEffect } from "react";
import { userState, fetchUserState } from "../../recoil/ProfileAtom";

import { NavLink } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";
import axios from "axios";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  // 유저 정보 넣기
  const setUserState = useSetRecoilState(userState);

  const [errorModal, setErrorModal] = useRecoilState(errorState);

  // 마이페이지에 들어왔을 때 API 조회
  const fetchData = async () => {
    try {
      const response = await axios.get("https://non-existing-url.com/api/data");
      console.log(response);
    } catch (error) {
      console.log(error);
      setErrorModal(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className='mainContainer'
        style={{ marginLeft: "0px", marginRight: "0px" }}
      >
        {/* 에러 모달 표시 */}
        <ErrorModal
          buttonText={"뒤로가기"}
          show={errorModal}
          onClose={() => {
            setErrorModal(false);
            fetchData();
          }}
        >
          <h2>Error</h2>
          <p>에러등장</p>
          <button onClick={() => setErrorModal(false)}>
            희영정보넣기(더미)
          </button>
        </ErrorModal>
        {/* 프로필 */}
        <Profile />
        {/* 아이콘 컴포넌트 */}
        <div className={classes.IconContainer}>
          <IconBox icon={"back"} name={"찜목록"} />
          <IconBox icon={"back"} name={"예약현황"} />
          <IconBox icon={"back"} name={"내후기"} />
        </div>
        내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
        알림설정( 이 되나? ), 커플 등록
        <div className={classes.SettingContainer}>
          <NavLink to='/setting'>
            <div>
              <p>설정</p>
              {/* 아이콘으로 바꾸기 */}
              <div>화살표로바꿈</div>
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default MyPage;
