import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

import StepIndicator from "../../components/Login/StepIndicator";
import LoginStepForm from "../../components/Login/LoginStepForm";

export default function Join() {
  // Step
  const location = useLocation();
  const initialStep = location.state.currentStep || 0;
  const [currentStep, setCurrentStep] = useState(initialStep);

  // 추가정보 데이터 넣기
  const [userData, setUserData] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
  });

  const setThemeState = (gender) => {
    const rootElement = document.documentElement;

    switch (gender) {
      case "MALE":
        rootElement.style.setProperty("--color-point", "var(--color-groom)");
        break;
      case "FEMALE":
        rootElement.style.setProperty("--color-point", "var(--color-brider)");
        break;
    }
  };

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
    // console.log(formData);
    nextStep();
  };
  const nextStep = () => {
    if (currentStep === 3) {
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

  // 추가 정보 작성 POST 요청 주고, 유저 데이터에 넣기
  const handleSignUp = async () => {
    const currentFcmToken = await getToken();
    let customData = formData;
    // console.log("여기가 중요", userData, userData.coupleCode);
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
        // console.log(
        //   response.headers["authorization"],
        //   response.headers["authorization_refresh"],
        // );
        localStorage.setItem("accessToken", response.headers["authorization"]);
        localStorage.setItem(
          "refreshToken",
          response.headers["authorization_refresh"],
        );
      }
      setUserData(formData);
      setThemeState(formData.gender);
      // console.log(response);
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
    }
  };

  return (
    <div>
      <StepIndicator currentStep={currentStep} onPrevClick={handlePrevClick} />

      <LoginStepForm
        step={currentStep}
        handleSubmit={handleSubmit}
        onChangeHandlers={{ handleChange, onToggleChange }}
        values={formData}
      />
    </div>
  );
}
