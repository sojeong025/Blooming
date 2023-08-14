import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Join.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState, themeState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

// 공사중 ==========================================================
import StepIndicator from "../../components/Login/StepIndicator";
import LoginStepForm from "../../components/Login/LoginStepForm";

export default function Join() {
  // Step
  const location = useLocation();
  const initialStep = location.state.currentStep || 0;
  const [currentStep, setCurrentStep] = useState(initialStep);

  // 추가정보 데이터 넣기
  const setTheme = useSetRecoilState(themeState)
  const [userData, setUserData] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
  });
  // const dummy = {
  //   email: "lotus0028@kakao.com",
  //   nickname: "희영",
  //   gender: "FEMALE",
  // };
  // // 체크용 더미
  // useEffect(() => {
  //   // 'nickname' -> 'name'
  //   const updatedDummy = { ...dummy, name: dummy.nickname };
  //   delete updatedDummy.nickname;

  //   setFormData({ ...formData, ...updatedDummy });
  //   console.log("check", formData);
  // }, []);

  const onToggleChange = (event) => {
    const gender = event.target.checked ? "FEMALE" : "MALE";
    setFormData({ ...formData, gender });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 이전 단계 이동
  const handlePrevClick = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };
  // 저장 후 단계 넘어가기
  const handleSubmit = (step) => (event) => {
    event.preventDefault();
    console.log(formData);
    nextStep();
  };
  const nextStep = () => {
    if (currentStep === 3) {
      console.log(formData);
      // 마지막 페이지 로그인 정보 입력 끝 넘기기
      handleSignUp();
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const navigate = useNavigate();
  // fcmToken 받아오기
  const [fcmToken, setFcmToken] = useState("");
  const getToken = function () {
    return new Promise((resolve) => {
      if (window.flutter_inappwebview) {
        window.flutter_inappwebview
          .callHandler("handleFoo")
          .then(function (result) {
            setFcmToken(JSON.stringify(result.fcmT).slice(1, -1));
            resolve(JSON.stringify(result.fcmT).slice(1, -1));
          });
      } else {
        resolve(null);
      }
    });
  };
  useEffect(() => {
    getToken();
  }, []);

  // 카카오 유저 정보 받아오기 -> formData에 저장:
  const getKakaoProfile = async () => {
    try {
      const response = await customAxios.get("kakao-profile");
      const kakaoData = response.data.result[0];
      // setFormData({ ...formData, ...kakaoData });

      const genderInUpperCase = kakaoData.gender.toUpperCase();
      const updatedKakaoData = {
        ...kakaoData,
        gender: genderInUpperCase,
        name: kakaoData.nickname,
      };
      delete updatedKakaoData.nickname;
      setFormData({ ...formData, ...updatedKakaoData });
    } catch (error) {
      console.log("카카오 유저 정보 에러: ", error);
      // location.reload();
    }
  };
  // 토큰 가져오기
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken"),
  );
  useEffect(() => {
    const syncToken = () => {
      setAccessToken(localStorage.getItem("accessToken"));
    };
    window.addEventListener("storage", syncToken);
    return () => {
      window.removeEventListener("storage", syncToken);
    };
  }, []);
  useEffect(() => {
    if (accessToken) {
      getKakaoProfile();
    }
  }, [accessToken]);

  // 공사중 ====================================================
  // 추가 정보 작성 POST 요청 주고, 유저 데이터에 넣기
  const handleSignUp = async () => {
    const currentFcmToken = await getToken();
    let customData = formData;
    console.log("여기가 중요", userData, userData.coupleCode);
    if (userData.coupleCode) {
      customData = {
        ...formData,
        coupleCode: userData.coupleCode,
      };
    } else {
      customData = {
        ...formData,
      };
    }
    try {
      const updatedFormData = fcmToken
        ? { ...customData, fcmToken: currentFcmToken }
        : customData;
      const response = await customAxios.post("sign-up", updatedFormData);
      if (
        response.headers["authorization"] &&
        response.headers["authorization_refresh"]
      ) {
        console.log(
          response.headers["authorization"],
          response.headers["authorization_refresh"],
        );
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem(
          "refreshToken",
          response.headers["authorization_refresh"],
        );
      }
      setUserData(formData);
      setTheme(formData.gender)
      console.log(response);
      // navigate("/decide-wedding", {
      //   state: { pageTitle: "회원가입" },
      // });
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      // navigate("/");
    }
  };

  // 제출 버튼 클릭
  // const joinSubmit = async (event) => {
  //   event.preventDefault();
  //   handleSignUp();
  // };

  return (
    <div>
      <StepIndicator currentStep={currentStep} onPrevClick={handlePrevClick} />

      <LoginStepForm
        step={currentStep}
        handleSubmit={handleSubmit}
        onChangeHandlers={{ handleChange, onToggleChange }}
        values={formData}
      />

      {/* <div className={classes.titleText}>추가 정보를 입력해주세요</div>
      <div className={classes.container}>
        <form onSubmit={joinSubmit}>
          <InputForm
            label='이름'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='이름을 작성해주세요.'
            autoFocus
            required
          />
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
          <button type='submit' className={classes.submitButton}>
            제출
          </button>
        </form>
      </div> */}
    </div>
  );
}
