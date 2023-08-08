import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Login/Button";
import InputForm from "../../components/Common/InputText";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { weddingDateState, weddingDdayCal } from "../../recoil/WeddingDdayAtom";
import { userState } from "../../recoil/ProfileAtom";
import { customAxios } from "../../lib/axios";

export default function Share() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);
  // 유저 정보 가져오기
  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");
      console.log(response.data.result[0]);
      // 유저 정보 저장
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error("유저 정보 API 에러", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const verifyCode = userData.coupleCode;

  // 상대방 코드 확인
  const [formData, setFormData] = useState({
    name: "",
    coupleCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 인증코드 확인
  const [coupled, setCoupled] = useState(false);
  const [description, setDescription] = useState();
  const setCouple = async (event) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", formData);
      setDescription(`${formData.name}님이 맞나요?`);
      setCoupled(true);

      console.log(userData);
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      setDescription(error.response.data.message);
    }
  };

  // 상대방 연결
  const connectCouple = async (event) => {
    event.preventDefault();
    try {
      await customAxios.put("couple", formData);
      // 연결완료 모달이라도 띄워줄까.?
    } catch (error) {
      console.log("상대방 연결 에러:", error);
    }
  };

  // 카카오톡 공유하기 버튼
  const [shareBtn, setShareBtn] = useState(false)

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setShareBtn(true);
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className='mainContainer'>
      <h3>{userData.name}님의 약혼자를 연결해주세요.</h3>

      <div>
        <CopyToClipboardButton text={verifyCode}>
          <div style={{ padding: "10px" }}>
            <p>나의 코드 복사</p>
            <p style={{ textDecoration: "underline" }}>{verifyCode}</p>
          </div>
        </CopyToClipboardButton>
        { shareBtn && <KakaoShareButton code={verifyCode} /> }
      </div>

      <p>or</p>
      <hr />

      <div>
        <p>상대방 코드로 연결하기</p>
        <form onSubmit={setCouple}>
          <InputForm
            label='이름'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus
          />
          <InputForm
            label='커플 코드'
            name='coupleCode'
            value={formData.coupleCode}
            onChange={handleChange}
            required
          />
          {/* 위에 input 다 쳐야 인증 버튼 활성화 시키고 싶음 */}
          <button type='submit'>인증</button>
        </form>
      </div>
      <p>{description}</p>
      {coupled && (
        <>
          <form onSubmit={connectCouple}>
            <button type='submit'>연결하기</button>
          </form>
        </>
      )}

      <br />
      <a onClick={() => navigate("/home")}>메인 페이지로</a>
    </div>
  );
}
