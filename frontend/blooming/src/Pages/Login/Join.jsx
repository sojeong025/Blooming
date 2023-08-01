import { useNavigate, useParams } from "react-router-dom";
import classes from "./Join.module.css";
import InputForm from "../../components/Common/InputText";
import { useRecoilState } from "recoil";
import {
  UserInfoName,
  UserInfoNickname,
  UserInfoPhone,
  UserInfoGender,
} from "../../recoil/UserInfoAtom";
import { tokenState } from "../../recoil/TokenAtom";
import axios from "axios";
// 에러 모달
import useErrorModal from "../../components/Error/useErrorModal";

export default function Join() {
  const navigate = useNavigate();
  const [name, setName] = useRecoilState(UserInfoName);
  const [nickname, setNickname] = useRecoilState(UserInfoNickname);
  const [phoneNumber, setPhoneNumber] = useRecoilState(UserInfoPhone);
  const [gender, setGender] = useRecoilState(UserInfoGender);
  const [token, setToken] = useRecoilState(tokenState);

  // 에러 모달
  const [ErrorModal, handleError] = useErrorModal();

  const handlerChangeName = (event) => {
    setName(event.target.value);
  };

  // 닉네임 변경 핸들러
  const handlerChangeNickname = (event) => {
    setNickname(event.target.value);
  };

  // 전화번호 변경 핸들러
  const handlerChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlerChangeGender = (event) => {
    setGender(event.target.value);
  };

  // 제출 버튼 클릭 시 처리할 함수
  const joinSubmit = async (event) => {
    event.preventDefault();
    console.log(token);

    const url = "http://43.200.254.50:8080/sign-up";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const data = {
      name: name,
      nickname: nickname,
      phoneNumber: phoneNumber,
      gender: gender,
    };

    try {
      // 헤더와 데이터를 포함하여 POST 요청 보내기
      const response = await axios.post(url, data, { headers });

      // 응답 데이터 처리
      console.log("응답 데이터:", response.data);

      // 가입이 성공하면 다음 페이지로 이동
      navigate("/Question");
    } catch (error) {
      // 에러 처리
      console.error("API 요청 에러:", error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className={classes.header}>
        <h2>추가 정보 입력</h2>
      </div>
      <div className={classes.container}>
        <form onSubmit={joinSubmit}>
          {/* 카카오 아이디 */}
          <div className={classes.container}>
            <label htmlFor='name' className={classes.inputLabel}>
              이름
            </label>
            <input
              onChange={handlerChangeName}
              className={classes.inputField}
              type='text'
              id='name'
              value={name}
              required
              autoFocus
              placeholder='이름을 작성해주세요.'
            />
          </div>
          {/* <InputForm id='name' label='이름' required /> */}
          {/* 닉네임 */}
          <div className={classes.container}>
            <label htmlFor='nickname' className={classes.inputLabel}>
              닉네임
            </label>
            <input
              onChange={handlerChangeNickname}
              className={classes.inputField}
              type='text'
              id='nickname'
              value={nickname}
              required
              placeholder='닉네임을 작성해주세요.'
            />
          </div>
          {/* <InputForm id='nickname' label='닉네임' required autoFocus /> */}
          {/* 전화번호 */}
          <div className={classes.container}>
            <label htmlFor='phoneNumber' className={classes.inputLabel}>
              전화번호
            </label>
            <input
              onChange={handlerChangePhoneNumber}
              className={classes.inputField}
              type='text'
              id='phoneNumber'
              value={phoneNumber}
              required
              placeholder='전화번호를 작성해주세요.'
            />
          </div>
          {/* <InputForm id='phoneNumber' label='전화번호' required /> */}

          {/* gender */}
          <div className={`${classes.genderSelect}`}>
            <div className={`${classes.genderButton} radio_male`}>
              <input
                id='gender-1'
                type='radio'
                name='gender'
                value='MALE'
                onChange={handlerChangeGender}
              />
              <label htmlFor='gender-1'>신랑</label>
            </div>

            <div className={`${classes.genderButton} radio_male`}>
              <input
                id='gender-2'
                type='radio'
                name='gender'
                value='FEMALE'
                onChange={handlerChangeGender}
              />
              <label htmlFor='gender-2'>신부</label>
            </div>
          </div>

          {/* 추천인 코드 */}
          <div className={classes.inputContainer}>
            <InputForm
              id='coupleCode'
              label='약혼자 코드'
              className={classes.inputField}
            />
            <button type='submit' className={classes.confirmButton}>
              인증
            </button>
          </div>

          <button type='submit' className={classes.submitButton}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
