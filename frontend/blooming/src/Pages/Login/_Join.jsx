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
  const [name, setName] = useRecoilState(UserInfoName);
  const [nickname, setNickname] = useRecoilState(UserInfoNickname);
  const [phoneNumber, setPhoneNumber] = useRecoilState(UserInfoPhone);
  const [gender, setGender] = useRecoilState(UserInfoGender);
  const [access, setAccess] = useRecoilState(accessTokenState);

  // 새 유저는 로그인 후 Join에 들어오니깐,
  // Token을 이용해서 카카오에서 받아온 유저 정보 받아오기

  // 카카오 로그인 시 받은 유저 정보 확인 (필수+선택)
  // 이거는 이미 있는 유저 데이터
  const [userData, setUserData] = useRecoilState(userState);

  // 이거는 폼에서 입력받는 데이터다
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    phoneNumber: "",
    coupleCode: "",
  });
  useEffect(() => {
    // console.log(userData);
    // console.log(formData);
  });

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

  // 제출 버튼 클릭 시 처리할 함수
  const joinSubmit = async (event) => {
    event.preventDefault();
    window.flutter_inappwebview
      .callHandler("handleFoo")
      .then(function (result) {
        console.log(JSON.stringify(result));
        let fcmtext = document.getElementById("fcminput");
        // fcm_token: 얘가 value
        fcmtext.value = result.fcmT;
      });
    handleSignUp();
  };

  return (
    <div className='mainContainer'>
      <div className={classes.header}>
        <h2>추가 정보 입력</h2>
      </div>
      <input type='text' id='fcminput'></input>

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
          <InputForm
            label='이메일'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='이메일을 작성해주세요.'
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
