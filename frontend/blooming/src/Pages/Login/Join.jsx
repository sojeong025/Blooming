import { useNavigate } from "react-router-dom";
import classes from "./Join.module.css";
import InputForm from "../../components/Common/InputText";
import { useState } from "react";

export default function Join() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  // const [errMsg, setErrMsg] = useState("");

  // 제출 버튼 클릭 시 처리할 함수
  const joinSubmit = (event) => {
    event.preventDefault();
    navigate("/Question");
  };

  return (
    <>
      <div className={classes.header}>
        <h2>추가 정보 입력</h2>
      </div>

      <div className={classes.container}>
        <form onSubmit={joinSubmit}>
          {/* 카카오 아이디 */}
          <InputForm id='name' label='아이디' disabled />
          {/* 닉네임 */}
          <InputForm id='nickname' label='닉네임' required autoFocus />
          {/* 전화번호 */}
          <InputForm id='phoneNumber' label='전화번호' required />

          {/* gender */}
          <div className={`${classes.genderSelect}`}>
            <div className={`${classes.genderButton} radio_male`}>
              <input id='gender-1' type='radio' name='gender' value='MALE' />
              <label htmlFor='gender-1'>신랑</label>
            </div>

            <div className={`${classes.genderButton} radio_male`}>
              <input id='gender-2' type='radio' name='gender' value='FEMALE' />
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
    </>
  );
}
