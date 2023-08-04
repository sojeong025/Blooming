import WeddingDday from "../components/Home/WeddingDday";
// import ScheduleDday from "../components/Home/ScheduleDday";
// import MainImage from "../components/Home/MainImage";
import PlanTips from "../components/Home/PlanTips";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../recoil/ProfileAtom";
import { customAxios } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {

  useEffect(() => {
    // register a function to handle FCM token in the window object
    window.handleFcmToken = (token) => {
      console.log("FCM Token from Flutter:", token);
      // 이제 웹 페이지에 token을 사용하거나 서버로 전송할 수 있습니다.
    };

    // unregister the handleFcmToken function once the component is dismounted
    return () => {
      window.handleFcmToken = null;
    };
  }, []);

  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const resetUserState = useResetRecoilState(userState);

  const updateUser = async () => {
    try {
      // 유저 정보 조회
      const res = await customAxios('profile');
      if (res.data) {
        setUser({ ...res.data.result[0] });
      }
    } catch (error) {
      // 유저 정보 초기화
      resetUserState();
      console.error("유저 정보 API 요청 에러", error);
      navigate("/");
    }
  }

  useEffect(() => {
    updateUser();
  }, [user])


  return (
    <div className='mainContainer'>
      <WeddingDday />

      {/* PlanTips랑 합침 */}
      {/* <MainImage /> */}

      <PlanTips />

      {/* <ScheduleDday /> */}

      {/* 예약, 좋아요 */}
    </div>
  );
}

export default Home;
