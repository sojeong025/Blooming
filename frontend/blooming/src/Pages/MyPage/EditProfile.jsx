import { useRecoilState, useRecoilValue } from "recoil";
import { userRoleState, userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";

import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/Common/InputText";
import TopBtn from "../../components/Common/TopBtn";
import { styled } from "styled-components";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  const userRole = useRecoilValue(userRoleState);
  const [formData, setFormData] = useState({});

  // 기존 데이터 채우기
  useEffect(() => {
    setFormData({ ...userData });
  }, []);

  const updateUserData = async () => {
    try {
      await customAxios.put(
        "profile",
        // 수정할 데이터
        { ...formData },
      );
      setUserData({ ...formData });
      console.log(1);
      navigate("/my-page");
    } catch (error) {
      console.log("정보수정 에러", error);
    }
  };

  // 정보 입력
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitUpdate = async (event) => {
    event.preventDefault();
    updateUserData();
  };

  const deleteProfile = async () => {
    try {
      await customAxios.delete("profile");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`mainContainer ${classes.EditContainer}`}>
      <div>
        <div className={classes.profileContainer}>
          <img
            className={classes.profileImg}
            src={
              userData.profileImage
                ? userData.profileImage
                : `https://boring-avatars-api.vercel.app/api/avatar?variant=beam&name=${userData.name}`
            }
            alt='profile'
          />

          <div className={classes.profileEmail}>{formData.email}</div>
          {/* <div>{userRole}</div> */}
        </div>
        <form onSubmit={submitUpdate}>
          <InputForm
            label='닉네임'
            name='nickname'
            value={formData.nickname}
            onChange={handleChange}
            required
          />
          <InputForm
            label='이름'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputForm
            label='전화번호'
            name='phoneNumber'
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder='전화번호를 작성해주세요.'
            required
          />
          {/* form이 바뀌면, 완료 버튼 활성화 시키기!! */}
          {/* <TopBtn text='완료' onSubmit={submitUpdate} /> */}
          <button type='submit' onSubmit={submitUpdate}>
            완료
          </button>
        </form>
      </div>

      {/* 누르면 모달로 바꾸기 */}
      <a className={classes.deleteProfile} onClick={deleteProfile}>
        회원탈퇴
      </a>
    </div>
  );
};
export default EditProfile;
