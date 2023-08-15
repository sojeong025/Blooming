import { useRecoilState, useRecoilValue } from "recoil";
import { userRoleState, userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";

import { useEffect, useRef, useState } from "react";
import { customAxios, fileAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

import DeleteModal from "../../components/MyPage/DeleteModal";

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

const EditProfile = () => {
  const navigate = useNavigate();

  const userRole = useRecoilValue(userRoleState);
  const [userData, setUserData] = useRecoilState(userState);
  const [formData, setFormData] = useState({});

  const inputFileRef = useRef();
  const [image, setImage] = useState(userData.profileImage);

  // 탈퇴 모달
  const [isModal, setIsModal] = useState(false);

  // 기존 데이터 채우기
  useEffect(() => {
    setFormData({ ...userData });
  }, []);

  // 정보 입력
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    const newErrors = validate({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  // 정보 수정
  const updateUserData = async () => {
    try {
      await customAxios.put("profile", { ...formData });
      setUserData({ ...formData });
      navigate("/my-page");
    } catch (error) {
      console.log("정보수정 에러", error);
    }
  };
  const submitUpdate = async (event) => {
    event.preventDefault();
    updateUserData();
  };

  // 사진 변경
  const handleImageClick = () => {
    inputFileRef.current.click();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageFormData = new FormData();
        imageFormData.append("image", file);
        const response = await fileAxios.post("INVITATION", imageFormData);
        setImage(response.data.result[0].uploadImageUrl);
        setFormData({
          ...formData,
          profileImage: response.data.result[0].uploadImageUrl,
        });
      } catch (error) {
        console.error("이미지 api 오류", error);
      }
    }
  };

  // 추가정보 유효성 검사
  const [errors, setErrors] = useState(() => validate(formData));
  useEffect(() => {
    setErrors(validate(formData));
  }, [formData]);

  // 유효성 검사 후 버튼 활성화
  const inputStyle = (fieldName) => {
    if (errors[fieldName] !== undefined) {
      return `${classes.inputBox} ${classes.inputError}`;
    } else if (formData[fieldName] !== "") {
      return `${classes.inputBox} ${classes.inputFilled}`;
    } else {
      return classes.inputBox;
    }
  };

  // 회원탈퇴
  const deleteProfile = async () => {
    try {
      await customAxios.delete("profile");
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className={`mainContainer ${classes.EditContainer}`}>
      <div className={classes.profileContainer}>
        <div className={classes.profileEdit}>
          <AiOutlineEdit size={16} />
        </div>
        <img
          className={classes.profileImg}
          src={
            image
              ? image
              : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${userData.name}`
          }
          alt='profile'
          onClick={handleImageClick}
        />
        <input
          type='file'
          onChange={handleImageChange}
          ref={inputFileRef}
          style={{ display: "none" }}
          accept='image/*'
        />
        <div className={classes.profileEmail}>{formData.email}</div>
      </div>

      <form onSubmit={submitUpdate}>
        <hr />
        <div className={`${classes.wrapper} `}>
          {/* Gender 선택 넣기 */}
          <div className={`${classes.GenderSelector}`} onChange={handleChange}>
            <input
              type='radio'
              id='gender'
              name='gender'
              value='MALE'
              checked={formData.gender === "MALE"}
            />
            <label htmlFor='gender' className={classes.male}>
              신랑
            </label>
            <input
              type='radio'
              id='gender2'
              name='gender'
              value='FEMALE'
              checked={formData.gender === "FEMALE"}
            />

            <label htmlFor='gender2' className={classes.female}>
              신부
            </label>
          </div>

          <div className={classes.codeContainer}>
            <label htmlFor='name' className={classes.label}>
              이름
              <input
                required
                type='text'
                name='name'
                value={formData.name}
                placeholder='이름을 작성해주세요'
                onChange={handleChange}
                className={inputStyle("name")}
              />
            </label>
            {errors.name && (
              <div className={classes.errorMessage}>{errors.name}</div>
            )}
          </div>
          <div className={classes.codeContainer}>
            <label htmlFor='nickname' className={classes.label}>
              닉네임
              <input
                required
                type='text'
                name='nickname'
                value={formData.nickname}
                placeholder='이름을 작성해주세요'
                onChange={handleChange}
                className={inputStyle("nickname")}
              />
            </label>
            {errors.nickname && (
              <div className={classes.errorMessage}>{errors.nickname}</div>
            )}
          </div>
          <div className={classes.codeContainer}>
            <label htmlFor='phoneNumber' className={classes.label}>
              전화번호
              <input
                required
                inputMode='tel'
                type='text'
                name='phoneNumber'
                value={formData.phoneNumber}
                placeholder='01012345678'
                onChange={handleChange}
                className={inputStyle("phoneNumber")}
              />
            </label>
            {errors.phoneNumber && (
              <div className={classes.errorMessage}>{errors.phoneNumber}</div>
            )}
          </div>
        </div>
        <button
          className={classes.SubmitBtn}
          type='submit'
          disabled={Object.keys(errors).length > 0}
        >
          저장
        </button>
      </form>

      {/* 회원탈퇴 */}
      <div className={classes.deleteProfile} onClick={() => setIsModal(true)}>
        탈퇴하기
      </div>
      <DeleteModal
        userData={userData}
        deleteProfile={deleteProfile}
        show={isModal}
        onClose={() => setIsModal(false)}
      />
    </div>
  );
};
export default EditProfile;
