import { styled } from "styled-components";
import classes from "./LoginStep.module.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

import { useRecoilState } from "recoil";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const coupleCodeValidate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "이름을 입력해주세요.";
    return errors;
  }
  // 코드
  if (!/^\d{8}$/.test(values.coupleCode)) {
    errors.coupleCode = "숫자 8자리를 입력해주세요.";
    return errors;
  }
  return errors;
};

// 추가정보 유효성
const validate = (values) => {
  const errors = {};
  // 이름
  if (!values.name) {
    errors.name = "이름을 입력해주세요.";
    return errors;
  } else if (!/^[가-힣a-zA-Z]+$/.test(values.name)) {
    errors.name = "이름은 한글 또는 영어로만 입력해주세요.";
    return errors;
  }
  // 전화번호
  if (!values.phoneNumber) {
    errors.phoneNumber = "전화번호를 입력해주세요.";
  } else if (!/^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/.test(values.phoneNumber)) {
    errors.phoneNumber = "올바른 전화번호 형식이 아닙니다.";
  }
  // 닉네임
  if (!values.nickname) {
    errors.nickname = "닉네임을 입력해주세요.";
  } else if (values.nickname.length < 2 || values.nickname.length > 5) {
    errors.nickname = "닉네임은 2~5자로 작성해주세요.";
  } else if (!/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,5}$/.test(values.nickname)) {
    errors.nickname = "닉네임에는 한글, 영어, 숫자만 사용할 수 있습니다.";
  }

  return errors;
};

const StepForm = ({ step, handleSubmit, onChangeHandlers, values }) => {
  const { handleChange, onToggleChange } = onChangeHandlers;

  // 추가정보 유효성 검사
  const [errors, setErrors] = useState(() => validate(values));
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);
  const handleFieldChange = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    const newErrors = validate({ ...values, [name]: value });
    setErrors(newErrors);
  };
  // 유효성 검사 후 다음버튼 활성화
  const inputStyle = (fieldName) => {
    if (errors[fieldName] !== undefined) {
      return `${classes.inputBox} ${classes.inputError}`;
    } else if (values[fieldName] !== "") {
      return `${classes.inputBox} ${classes.inputFilled}`;
    } else {
      return classes.inputBox;
    }
  };

  // 커플 코드 인증 =====================================================
  const [coupleData, setCoupleData] = useState({ name: "", coupleCode: "" });
  const [coupleErrors, setCoupleErrors] = useState(() =>
    coupleCodeValidate(values),
  );
  const [coupled, setCoupled] = useState("");

  const handleCoupleChange = async (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    const updatedCoupleData = { ...coupleData, [name]: value };
    setCoupleData(updatedCoupleData);

    const newErrors = coupleCodeValidate({ ...values, [name]: value });
    setCoupleErrors(newErrors);

    // 유효성 검증에 실패하는 것이 없는지 확인
    const isAllValid = Object.values(newErrors).every((error) => error === "");
    if (isAllValid) {
      setCouple(event, updatedCoupleData);
    }
  };
  // 유효성 검사 후 인증코드 확인 시 다음버튼 활성화
  const inputCoupleStyle = (fieldName) => {
    if (coupleErrors[fieldName] !== undefined) {
      return `${classes.inputBox} ${classes.inputError}`;
    } else if (coupleData[fieldName] !== "") {
      return `${classes.inputBox} ${classes.inputFilled}`;
    } else {
      return classes.inputBox;
    }
  };

  // 인증코드 확인
  const [isVerified, setIsVerified] = useState(false);
  const setCouple = async (event, validCoupleData) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", validCoupleData);
      setCoupled(`${coupleData.name}님과 연결이 가능합니다.`);
      handleChange({
        target: {
          name: "coupleCode",
          value: String(validCoupleData.coupleCode),
        },
      });
      setIsVerified(true);
    } catch (error) {
      setCoupled(error.response.data.message);
      setIsVerified(false);
    }
  };
  // 커플 코드 인증 =====================================================

  // 웨딩 날짜 선택=====================================
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);

  function dateChangeHandler(date) {
    setSelectedDate(date);
  }
  const submitHandler = async (event) => {
    event.preventDefault();

    const updateDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const weddingDatePick = {
      weddingDate: updateDate,
    };
    try {
      await customAxios.post("wedding-date", {
        ...weddingDatePick,
      });
      setWeddingDate(updateDate);
      if (typeof handleSubmit === "function") {
        await handleSubmit(4)(event);
      }
    } catch (error) {
      console.log("웨딩 정보 POST 에러: ", error);
    }
  };
  // 웨딩 날짜 선택 ====================================

  return (
    <>
      {/* 0. 가입 시 커플 코드 입력 */}
      {step === 0 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={handleSubmit(0)}>
            <p className={classes.titleText}>
              상대방의 이름과 코드를 입력해주세요
            </p>
            <p className={classes.subText}>
              상대방 코드는 가입 후에도 입력할 수 있어요.
            </p>
            <div className={`${classes.wrapper} `}>
              <div className={classes.codeContainer}>
                <input
                  required
                  autoFocus
                  type='text'
                  name='name'
                  value={coupleData.name}
                  placeholder='상대방 이름'
                  onChange={handleCoupleChange}
                  className={inputCoupleStyle("name")}
                />
                {coupleErrors.name && (
                  <div className={classes.errorMessage}>
                    {coupleErrors.name}
                  </div>
                )}
              </div>
              <div className={classes.codeContainer}>
                <input
                  required
                  inputMode='tel'
                  type='text'
                  name='coupleCode'
                  value={coupleData.coupleCode}
                  placeholder='상대방 연결 코드'
                  onChange={handleCoupleChange}
                  className={inputCoupleStyle("coupleCode")}
                />
                {coupleErrors.coupleCode && (
                  <div className={classes.errorMessage}>
                    {coupleErrors.coupleCode}
                  </div>
                )}
              </div>
            </div>
            <div className={classes.coupledNo}>{coupled}</div>
            <div className={classes.passCode} onClick={handleSubmit(0)}>
              코드 입력 건너뛰기
            </div>
            <NextButton type='submit' disabled={!isVerified}>
              다음
            </NextButton>
          </form>
        </div>
      )}
      {/* 1. name, gender */}
      {step === 1 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={handleSubmit(1)}>
            <p className={classes.titleText}>당신의 이름을 알려주세요</p>
            <p className={classes.subText}>
              입력한 정보는 언제든 수정이 가능합니다.
            </p>

            <div className={`${classes.wrapper} ${classes.inputName}`}>
              <div
                className={`${classes.GenderSelector}`}
                onChange={handleFieldChange}
              >
                <input
                  type='radio'
                  id='gender'
                  name='gender'
                  value='MALE'
                  checked={values.gender === "MALE"}
                />

                <label htmlFor='gender' className={classes.male}>
                  신랑
                </label>
                <input
                  type='radio'
                  id='gender2'
                  name='gender'
                  value='FEMALE'
                  checked={values.gender === "FEMALE"}
                />

                <label htmlFor='gender2' className={classes.female}>
                  신부
                </label>
              </div>

              <div>
                <input
                  required
                  autoFocus
                  type='text'
                  name='name'
                  value={values.name}
                  onChange={handleFieldChange}
                  placeholder='이름'
                  className={inputStyle("name")}
                />
                {errors.name && (
                  <div className={classes.errorMessage}>{errors.name}</div>
                )}
              </div>
            </div>

            <NextButton type='submit' disabled={errors.name}>
              다음
            </NextButton>
          </form>
        </div>
      )}
      {/* 2. phoneNumber */}
      {step === 2 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={handleSubmit(2)}>
            <p className={classes.titleText}>
              {values.name}님의 전화번호를 알려주세요
            </p>
            <p className={classes.subText}>
              입력한 정보는 언제든 수정이 가능합니다.
            </p>
            <div className={classes.wrapper}>
              <input
                required
                autoFocus
                inputMode='tel'
                type='text'
                name='phoneNumber'
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder='01012345678'
                className={inputStyle("phoneNumber")}
              />
              {errors.phoneNumber && (
                <div className={classes.errorMessage}>{errors.phoneNumber}</div>
              )}
            </div>
            <NextButton type='submit' disabled={errors.phoneNumber}>
              다음
            </NextButton>
          </form>
        </div>
      )}
      {/* 3. nickname */}
      {step === 3 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={handleSubmit(3)}>
            <p className={classes.titleText}>
              {values.name}님의 닉네임을 알려주세요
            </p>
            <p className={classes.subText}>
              입력한 정보는 언제든 수정이 가능합니다.
            </p>
            <div className={classes.wrapper}>
              <input
                required
                autoFocus
                type='text'
                name='nickname'
                value={values.nickname}
                onChange={handleChange}
                placeholder='닉네임'
                className={classes.inputBox}
              />
              {errors.nickname && (
                <div className={classes.errorMessage}>{errors.nickname}</div>
              )}
            </div>
            <NextButton type='submit' disabled={errors.nickname}>
              다음
            </NextButton>
          </form>
        </div>
      )}
      {/* 회원가입 완료 ==================== */}
      {/* 4. weddingDate */}
      {step === 4 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={submitHandler}>
            <p className={classes.titleText}>
              {values.name}님의 결혼 날짜는 정해졌나요?
            </p>
            <p className={classes.subText}>
              입력한 정보는 언제든 수정이 가능합니다.
            </p>
            <div className={classes.datePick}>
              <DatePicker
                dateFormat='yyyy-MM-dd'
                shouldCloseOnSelect
                selected={selectedDate}
                onChange={dateChangeHandler}
              />
            </div>
            <div className={classes.codeBtn} onClick={handleSubmit(4)}>
              아직 정해지지 않았어요
            </div>
            <NextButton type='submit'>다음</NextButton>
          </form>
        </div>
      )}
      {step === 5 && (
        <Container>
          {/* <img src='src/assets/Logo/logo2.png' alt='Blooming' /> */}
        </Container>
      )}
    </>
  );
};

export default StepForm;

const NextButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: 16px;

  height: 60px;
  width: 60px;

  font-size: 17px;
  font-weight: bold;

  border: none;
  background-color: transparent;

  color: var(--color-join-point);

  &:disabled {
    color: gray;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;

  img {
    object-fit: scale-down;
  }
`;
