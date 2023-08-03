import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Login/Button";
import InputForm from "../../components/Common/InputText";

import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { weddingDateState, weddingDdayCal } from "../../recoil/WeddingDdayAtom";
import { userState } from "../../recoil/ProfileAtom";
import { customAxios } from "../../lib/axios";

export default function Share() {
  const navigate = useNavigate();

  // const weddingDdayCal = useRecoilValue(weddingDdayCal);
  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);

  const [userData, setUserData] = useRecoilState(userState);

  // 커플 코드를 가져오려면 유저 정보를 다시 가져와야 함
  // 유저 정보 가져오기
  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");
      console.log(response.data.result[0]);
      // 유저 정보 새로 저장
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error("유저 정보 API 에러", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const verifyCode = userData.coupleCode.toString();

  return (
    <div className='mainContainer'>
      <h3>{userData.name}님의 약혼자를 연결해주세요</h3>
      <h4>등록은 한명만</h4>
      <p>상대방 코드 등록</p>
      <InputForm label='약혼자코드' name='' />
      <Button text='인증요청' />
      <hr />
      <p>내 코드: {verifyCode}</p>
      <CopyToClipboardButton text={verifyCode} />
      <KakaoShareButton />

      <Button text='완료' onClick={() => navigate("/home")} />
    </div>
  );
}
