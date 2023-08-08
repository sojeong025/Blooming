import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";
import classes from "./Share.module.css";

import { useNavigate } from "react-router-dom";

import InputForm from "../../components/Common/InputText";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { customAxios } from "../../lib/axios";
import { styled } from "styled-components";

export default function Share() {
  const navigate = useNavigate();
  // const [userData, setUserData] = useRecoilState(userState);
  const [userData, setUserData] = useState({
    profileImage:
      "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg",
    email: "lotus0028@kakao.com",
    name: "string",
    nickname: "string",
    phoneNumber: "string",
    gender: "string",
    coupleCode: 25065652,
  });
  // 유저 정보 가져오기
  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");
      // console.log(response.data.result[0]);
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
  const [shareBtn, setShareBtn] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setShareBtn(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='mainContainer'>
      <Wrapper>
        <p className={classes.mainText}>약혼자 연결을 해주세요.</p>
        <div className={classes.subText}>
          <p>블루밍의 다양한 기능을 함께 사용할 수 있습니다.</p>
        </div>

        <div>
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
            {/* 위에 input 다 쳐야 인증 버튼 활성화 */}
            <button type='submit'>인증</button>
          </form>
        </div>

        <div>
          <CopyToClipboardButton text={verifyCode}>
            <div style={{ padding: "10px" }}>
              <p>나의 코드</p>
              <span style={{ textDecoration: "underline" }}>{verifyCode}</span>
            </div>
          </CopyToClipboardButton>
          {shareBtn && <KakaoShareButton code={verifyCode} />}
        </div>
        <p>or</p>
        <hr />
        <p>{description}</p>
        {coupled && (
          <>
            <form onSubmit={connectCouple}>
              <button type='submit'>연결하기</button>
            </form>
          </>
        )}
        <br />
        {/* <a onClick={() => navigate("/home")}>메인 페이지로</a> */}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
