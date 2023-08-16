import Profile from "../../components/MyPage/Profile";
import AppContainer from "../../components/MyPage/AppContainer";
import SettingList from "../../components/MyPage/SettingList";
import { useEffect, useState } from "react";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";

import { useSetRecoilState } from "recoil";
import { customAxios } from "../../lib/axios";

// 헤더 알림 아이콘 자리에 설정으로 바꾸기
function MyPage() {
  // 유저 정보 넣기
  const setUserData = useSetRecoilState(userState);
  const setCoupleData = useSetRecoilState(userCoupleState);
  const setWeddingDate = useSetRecoilState(weddingDateState);

  const [isCouple, setIsCouple] = useState(false);
  const [isChooseDate, setIsChooseDate] = useState(true);

  const setThemeState = (gender) => {
    const rootElement = document.documentElement;

    switch (gender) {
      case "MALE":
        rootElement.style.setProperty("--color-point", "var(--color-groom)");
        rootElement.style.setProperty(
          "--color-point-text",
          "var(--color-groom-text)",
        );
        rootElement.style.setProperty(
          "--color-point-opacity",
          "var(--color-groom-opacity)",
        );
        break;
      case "FEMALE":
        rootElement.style.setProperty("--color-point", "var(--color-brider)");
        rootElement.style.setProperty(
          "--color-point-text",
          "var(--color-brider-text)",
        );
        rootElement.style.setProperty(
          "--color-point-opacity",
          "var(--color-brider-opacity)",
        );
        break;
    }
  };

  // 유저 정보 조회
  const fetchUser = async () => {
    try {
      const response = await customAxios.get("profile");
      setUserData(response.data.result[0]);
      if (response.data.result[0]?.gender) {
        setThemeState(response.data.result[0].gender);
      }
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
      // console.log("약혼자 없음");
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
      // console.log("결혼식 날짜 없음");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCouple();
    fetchWeddingDate();
  }, []);

  return (
    <div style={{ marginLeft: "0px", marginRight: "0px", marginTop: "55px" }}>
      {/* 프로필 */}
      <Profile isCouple={isCouple} />
      {/* 아이콘 */}
      <AppContainer />
      <SettingList isChooseDate={isChooseDate} />
    </div>
  );
}

export default MyPage;
