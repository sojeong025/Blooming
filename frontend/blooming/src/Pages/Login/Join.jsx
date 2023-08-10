import { useNavigate } from "react-router-dom";
import classes from "./Join.module.css";
// 에러 모달
import useErrorModal from "../../components/Error/useErrorModal";
// Label Input Component
import InputForm from "../../components/Common/InputText";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

export default function Join() {
  // 에러 모달
  const [ErrorModal, handleError] = useErrorModal();
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

  // 추가정보 데이터 넣기
  const [userData, setUserData] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
  });
  

  // 카카오 유저 정보 받아오기:
  // email(수정불가), profileImage, 닉네임(이름), 성별(신랑신부)
  const getKakaoProfile = async () => {
    try {
      const response = await customAxios.get("kakao-profile");
      const kakaoData = response.data.result[0];
      setFormData({ ...formData, ...kakaoData });
    } catch (error) {
      // console.log("카카오 유저 정보 에러: ", error);
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

  // 추가 정보 입력
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
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
      console.log(response);
      navigate("/decide-wedding", {
        state: { pageTitle: "회원가입" },
      });
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      // navigate("/");
    }
  };

  // 제출 버튼 클릭
  const joinSubmit = async (event) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <div className='mainContainer'>
      <div className={classes.titleText}>추가 정보를 입력해주세요</div>

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
          <button type='submit' className={classes.submitButton}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
