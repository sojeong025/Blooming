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

  const verifyCode = userData.coupleCode;

  return (
    <div className='mainContainer'>
      <h3>{userData.name}님의 약혼자를 연결 후 블루밍을 시작해보세요.</h3>

      <div>
        <CopyToClipboardButton text={verifyCode}>
          <div style={{ padding: "10px" }}>
            <p>나의 코드 복사</p>
            <p style={{ textDecoration: "underline" }}>{verifyCode}</p>
          </div>
        </CopyToClipboardButton>

        <KakaoShareButton />
      </div>
      <p>or</p>
      <hr />
      <div>
        <p>상대방 코드로 연결하기</p>
        <form>
          <InputForm label='약혼자 이름' />
          <InputForm label='코드' />
          <Button type='submit' text='인증요청' />
        </form>
      </div>
      <br />
      <Button text='홈으로' onClick={() => navigate("/home")} />
    </div>
  );
}
