import { useNavigate, useParams } from "react-router-dom";
import classes from "./Join.module.css";
// Label Input Component
import InputForm from "../../components/Common/InputText";

import { useRecoilState } from "recoil";
import {
  UserInfoName,
  UserInfoNickname,
  UserInfoPhone,
  UserInfoGender,
} from "../../recoil/UserInfoAtom";
import { accessTokenState, refreshTokenState } from "../../recoil/TokenAtom";
import axios from "axios";
// 에러 모달
import useErrorModal from "../../components/Error/useErrorModal";
import { userState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

export default function Join() {
  // 에러 모달
  const [ErrorModal, handleError] = useErrorModal();
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  // 추가정보 데이터 넣기
  const [formData, setFormData] = useState({
    nickname: "",
    gender: "",
    name: "",
    phoneNumber: "",
  });

  // 카카오 유저 정보 받아오기
  const getKakaoProfile = async () => {
    try {
      // const response = await customAxios.get("kakao-profile");
      // console.log(response.data.result[0]);
      // const kakaoData = response.data.result[0]
      const kakaoData = {
        email: "lotus0028@kakao.com",
        nickname: "1",
        gender: "FEMALE",
      };
      setFormData({ ...formData, ...kakaoData });
    } catch (error) {
      console.log("카카오 유저 정보 에러:", error);
    }
  };

  useEffect(() => {
    getKakaoProfile();
    console.log(formData);
  }, []);

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    // console.log(userData);
    // console.log(formData);
  }, [userData]);

  // 폼에서 입력받아 제출버튼을 누르면, 유저 데이터에 저장하고
  // 추가 정보도 입력하기
  // 폼데이터 수정
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 추가 정보 작성 POST 요청
  const handleSignUp = async () => {
    try {
      const response = await customAxios.post("sign-up", formData);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  // 제출 버튼 클릭
  const joinSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();

    // window.flutter_inappwebview
    //   .callHandler("handleFoo")
    //   .then(function (result) {
    //     console.log(JSON.stringify(result));
    //     let fcmtext = document.getElementById("fcminput");
    //     // fcm_token: 얘가 value
    //     fcmtext.value = result.fcmT;
    //   });
    handleSignUp();
  };

  return (
    <div className='mainContainer'>
      <div className={classes.header}>
        <h2>추가 정보 입력</h2>
      </div>
      {/* <input type='text' id='fcminput'></input> */}

      <div className={classes.container}>
        <form onSubmit={joinSubmit}>
          {/* 이름은 본명 */}
          <InputForm
            label='이름'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='이름을 작성해주세요.'
            autoFocus
            required
          />
          {/* 카카오에서 받은 닉네임 디폴트 */}
          <InputForm
            label='닉네임'
            name='nickname'
            value={formData.nickname}
            onChange={handleChange}
            placeholder='닉네임을 작성해주세요.'
          />

          <InputForm
            label='전화번호'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='전화번호를 작성해주세요.'
            required
          />
          {/* gender */}
          <div className={`${classes.genderSelect}`}>
            <div className={`${classes.genderButton} radio_male`}>
              <input
                id='gender-1'
                type='radio'
                name='gender'
                value='MALE'
                onChange={handleChange}
                checked={formData.gender === "MALE"}
              />
              <label htmlFor='gender-1'>신랑</label>
            </div>
            <div className={`${classes.genderButton} radio_male`}>
              <input
                id='gender-2'
                type='radio'
                name='gender'
                value='FEMALE'
                onChange={handleChange}
                checked={formData.gender === "FEMALE"}
              />
              <label htmlFor='gender-2'>신부</label>
            </div>
          </div>

          {/* 추천인 코드 */}
          <InputForm
            label='약혼자 코드'
            name='coupleCode'
            value={formData.coupleCode}
            onChange={handleChange}
          />
          <button type='submit'>인증</button>

          <button type='submit' className={classes.submitButton}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
