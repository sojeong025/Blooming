import { useRecoilState, useRecoilValue } from "recoil";
import { userRoleState, userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";

import { useEffect, useRef, useState } from "react";
import { customAxios, fileAxios } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/Common/InputText";
import TopBtn from "../../components/Common/TopBtn";
import { styled } from "styled-components";

import DeleteModal from "../../components/MyPage/DeleteModal";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  const userRole = useRecoilValue(userRoleState);
  const [formData, setFormData] = useState({});

  const inputFileRef = useRef();
  const [image, setImage] = useState(userData.profileImage)

  // 탈퇴 모달
  const [isModal, setIsModal] = useState(false);

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

  const handleImageClick = () => {
    inputFileRef.current.click();
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', file);
        const response = await fileAxios.post('INVITATION', imageFormData);
        setImage(response.data.result[0].uploadImageUrl)
        setFormData({...formData, profileImage : response.data.result[0].uploadImageUrl });
      } catch (error) {
        console.error('이미지 api 오류', error);
      }
    }
  };

  const deleteProfile = async () => {
    try {
      await customAxios.delete("profile");
      navigate("/");
      // console.log("탈퇴");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`mainContainer ${classes.EditContainer}`}>
      <div className={classes.profileContainer}>
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
