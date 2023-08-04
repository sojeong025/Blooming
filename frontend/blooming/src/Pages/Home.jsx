import WeddingDday from "../components/Home/WeddingDday";
// import ScheduleDday from "../components/Home/ScheduleDday";
// import MainImage from "../components/Home/MainImage";
import PlanTips from "../components/Home/PlanTips";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../recoil/ProfileAtom";
import { customAxios } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {

  const [fcmToken, setFcmToken] = useState('없음')
  const [re, setRe] = useState('그냥 result')

  const getToken = function (){
    window.flutter_inappwebview.callHandler('handleFoo')
      .then(function (result) {
        setRe(JSON.stringify(result))
        setFcmToken(JSON.stringify(result.fcmT))
      });
  }

  useEffect(() => {
    getToken()
  }, [])

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
      <button onClick={getToken}>
        fcm내놔
      </button>
      <div>{ re } 이건 result값</div>
      <div>{ fcmToken } 이거 토큰임</div>

      {/* PlanTips랑 합침 */}
      {/* <MainImage /> */}

      <PlanTips />

      {/* <ScheduleDday /> */}

      {/* 예약, 좋아요 */}
    </div>
  );
}

export default Home;
