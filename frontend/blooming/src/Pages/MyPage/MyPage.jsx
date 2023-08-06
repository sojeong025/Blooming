import Profile from "../../components/MyPage/Profile";
import IconBox from "../../components/MyPage/IconBox";
import classes from "./MyPage.module.css";
import { useEffect, useState } from "react";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
import { weddingDateState, weddingDdayCal } from "../../recoil/WeddingDdayAtom";

import { NavLink } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";

import ErrorModal from "../../components/Error/Modal";
import { errorState } from "../../recoil/ErrorAtom";

import { customAxios } from "../../lib/axios";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  const [errorModal, setErrorModal] = useRecoilState(errorState);

  // 유저 정보 넣기
  const setUserData = useSetRecoilState(userState);
  const setCoupleData = useSetRecoilState(userCoupleState);
  const setWeddingDate = useSetRecoilState(weddingDateState);

  const [isCouple, setIsCouple] = useState(false);
  const [isChooseDate, setIsChooseDate] = useState(false);

  // 더미 데이터 넣기
  const setDummy = () =>
    setUserData({
      email: "더미@kakao.com",
      gender: "FEMALE",
      name: "더미",
      nickname: "더미",
      phoneNumber: "11",
      profileImg:
        "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg",
    });

  // 유저 정보 조회
  const fetchUser = async () => {
    try {
      const response = await customAxios.get("profile");
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error("유저 정보 조회 에러:", error);
      // setErrorModal(true);
    }
  };

  // 커플 정보 조회
  const fetchCouple = async () => {
    try {
      const response = await customAxios.get("my-fiance");
      setCoupleData(response.data.result[0]);
      setIsCouple(true);
    } catch (error) {
      console.log("약혼자 없음");
    }
  };

  // 결혼식 날짜 조회
  const fetchWeddingDate = async () => {
    try {
      const response = await customAxios.get("wedding-date");
      // 날짜(YYYY-MM-DD) 형태로만 받기
      setWeddingDate(response.data.result[0].weddingDate);
      setIsChooseDate(true);
    } catch (error) {
      console.log("결혼식 날짜 없음");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCouple();
    fetchWeddingDate();
  }, []);

  return (
    <div
      className='mainContainer'
      style={{ marginLeft: "0px", marginRight: "0px" }}
    >
      {/* 에러 모달 표시 */}
      <ErrorModal
        buttonText={"다시시도"}
        show={errorModal}
        onClose={() => {
          setErrorModal(false);
          fetchUser();
        }}
      >
        <h2>Error</h2>
        <p>에러등장</p>
        <button
          onClick={() => {
            setErrorModal(false);
            setDummy();
          }}
        >
          더미데이터넣기
        </button>
      </ErrorModal>
      {/* 프로필 박스 */}
      <Profile isCouple={isCouple} isChooseDate={isChooseDate} />
      {/* 아이콘 컴포넌트 */}
      {/* <div className={classes.IconContainer}>
        <IconBox icon={"back"} name={"찜목록"} />
        <IconBox icon={"back"} name={"예약현황"} />
        <IconBox icon={"back"} name={"내후기"} />
      </div>
      내 데이터: 찜한업체, 예약한업체, 후기쓴거, 남의후기도움되는거, 정보수정,
      알림설정( 이 되나? ), 커플 등록
      <div className={classes.SettingContainer}>
        <NavLink to='/edit-profile' state={{ pageTitle: "정보 수정" }}>
          <div>내 정보 관리</div>
        </NavLink>
        <NavLink to='/setting'>
          <div>
            <p>설정</p>
            <div>화살표로바꿈</div>
          </div>
        </NavLink>
      </div> */}
    </div>
  );
}

export default MyPage;
