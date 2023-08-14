import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";
import classes from "./Share.module.css";

import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { customAxios } from "../../lib/axios";

export default function Share() {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userState);

  // 유저 정보 가져오기
  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error("유저 정보 API 에러", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const verifyCode = userData.coupleCode;

  // 입력 코드받을 코드
  const [formData, setFormData] = useState({
    name: "",
    coupleCode: "",
  });
  // 코드 8자리 유효성
  const coupleCodeValidate = (values) => {
    const errors = {};
    if (!/^\d{8}$/.test(values.coupleCode)) {
      errors.coupleCode = "숫자 8자리를 입력해주세요.";
      return errors;
    }
    return errors;
  };
  // 유효성 검사 후 다음버튼 활성화
  const inputCoupleStyle = (fieldName) => {
    if (coupleErrors[fieldName] !== undefined) {
      return `${classes.inputBox} ${classes.inputError}`;
    } else if (formData[fieldName] !== "") {
      return `${classes.inputBox} ${classes.inputFilled}`;
    } else {
      return classes.inputBox;
    }
  };
  const [coupleErrors, setCoupleErrors] = useState(() =>
    coupleCodeValidate(formData),
  );
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const newErrors = coupleCodeValidate({ ...formData, [name]: value });
    setCoupleErrors(newErrors);

    const isAllValid = Object.values(newErrors).every((error) => error === "");
    if (isAllValid) {
      setCouple(e, updatedFormData);
    } else {
      setCoupled({
        isCoupled: false,
        description: ``,
      });
    }
  };

  // 인증코드 확인
  const [coupled, setCoupled] = useState({
    isCoupled: false,
    description: "",
  });
  const setCouple = async (event, validCoupleData) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", validCoupleData);
      setCoupled({
        isCoupled: true,
        description: `${validCoupleData.name}님과 연결이 가능합니다.`,
      });
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      setCoupled({
        isCoupled: false,
        description: error.response.data.message,
      });
    }
  };

  // 상대방 연결 put
  const connectCouple = async (event) => {
    event.preventDefault();
    try {
      await customAxios.put("couple", formData);
      navigate("/my-page");
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
    <>
      <div className={`${classes.JoinContainer}`}>
        <form onSubmit={connectCouple}>
          <p className={classes.titleText}>
            상대방의 이름과 코드를 입력해주세요
          </p>
          <p className={classes.subText}>
            블루밍의 다양한 기능을 함께 사용할 수 있습니다.
          </p>

          <div className={`${classes.wrapper} `}>
            <div className={classes.codeContainer}>
              <input
                required
                type='text'
                name='name'
                value={formData.name}
                placeholder='상대방 이름'
                onChange={handleChange}
                className={inputCoupleStyle("name")}
              />
              {coupleErrors.name && (
                <div className={classes.errorMessage}>{coupleErrors.name}</div>
              )}
            </div>
            <div className={classes.codeContainer}>
              <input
                required
                inputMode='tel'
                type='text'
                name='coupleCode'
                value={formData.coupleCode}
                placeholder='상대방 연결 코드'
                onChange={handleChange}
                className={inputCoupleStyle("coupleCode")}
              />
              {coupleErrors.coupleCode && (
                <div className={classes.errorMessage}>
                  {coupleErrors.coupleCode}
                </div>
              )}
            </div>
          </div>
          <div className={classes.coupledNo}>{coupled.description}</div>

          <button
            className={classes.SubmitBtn}
            type='submit'
            disabled={coupleErrors.coupleCode || !coupled.isCoupled}
          >
            저장
          </button>
        </form>
        <hr />

        <div className={classes.copyContainer}>
          <CopyToClipboardButton text={verifyCode}>
            <div className={classes.copyText}>
              <div className={classes.titleText}>
                <span>{userData.name}</span>님의 코드 복사하기
                <p className={classes.subText}>{verifyCode}asdasd</p>
              </div>
            </div>
          </CopyToClipboardButton>
          {shareBtn && <KakaoShareButton code={verifyCode} />}
        </div>
      </div>
    </>
  );
}
