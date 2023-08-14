import { styled } from "styled-components";
import classes from "./LoginStep.module.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";

const coupleCodeValidate = (values) => {
  const errors = {};

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
  const [coupled, setCoupled] = useState();

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
  // 유효성 검사 후 인증코드 확인
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
  const setCouple = async (event, validCoupleData) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", validCoupleData);
      // console.log(coupleData);
      // setCoupled(`${coupleData.name}님과 연결되었습니다.`);
      handleChange({
        target: { name: "coupleCode", value: String(coupleData.coupleCode) },
      });
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      setCoupled(error.response.data.message);
    }
  };
  // 커플 코드 인증 =====================================================

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
                  placeholder='코드'
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
            <NextButton type='submit' disabled={coupleErrors.coupleCode}>
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

            <h2>👷🏻‍♂️공사 중 체크하면 신부 체크안하면 신랑👷🏻‍♀️</h2>
            <div className={`${classes.wrapper} ${classes.inputName}`}>
              {/* <div
                className={`${classes.checkbox} ${
                  active ? classes.active : ""
                }`}
              >
                <input
                  type='checkbox'
                  id='gender'
                  name='gender'
                  checked={values.gender === "FEMALE"}
                  onChange={onToggleChange}
                  className={classes.input}
                />
                <label htmlFor='checkbox' className={classes.label}></label>
                <div className={`${classes.on}`}>
                  <span>ON</span>
                </div>
                <div className={`${classes.off}`}>
                  <span>OFF</span>
                </div>
              </div> */}

              <div className={`${classes.checkbox}`}>
                <input
                  className={classes.inputGender}
                  type='checkbox'
                  id='gender'
                  onChange={onToggleChange}
                  checked={values.gender === "FEMALE"}
                  name='gender'
                />
                <label htmlFor='gender' className={classes.labelGender}></label>
                <div className={classes.Male}>
                  <span>신랑</span>
                </div>
                <div className={classes.Female}>
                  <span>신부</span>
                </div>
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
            <p>입력한 정보는 언제든 수정이 가능합니다.</p>
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
          <h1>==👷🏻‍♂️공사 중 다음 버튼 눌러👷🏻‍♀️==</h1>
          <form onSubmit={handleSubmit(4)}>
            <p className={classes.titleText}>
              {values.name}님의 결혼 날짜는 정해졌나요?
            </p>
            <p> 입력한 정보는 언제든 수정이 가능합니다.</p>
            <label>
              <input
                type='date'
                name='weddingDate'
                value={values.weddingDate}
                onChange={handleChange}
              />
            </label>
            <NextButton type='submit'>다음</NextButton>
          </form>
        </div>
      )}
      {step === 5 && (
        <div className={classes.JoinContainer}>
          <form onSubmit={handleSubmit(5)}>
            <p className={classes.titleText}>회원가입 됐나?</p>
            <p>두근두근</p>
            {/* <p>입력한 정보는 언제든 수정이 가능해요.</p>
            <label>
              <input
                required
                type='text'
                name='step5'
                value={values.step5}
                onChange={handleChange}
              />
            </label> */}
            <NextButton type='submit'>다음</NextButton>
          </form>
        </div>
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
