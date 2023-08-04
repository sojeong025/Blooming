import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import InputForm from "../../components/Common/InputText";
import { useNavigate } from "react-router-dom";
import { responsiveArray } from "antd/es/_util/responsiveObserver";

const EditProfile = () => {
  const [userData, setUserData] = useRecoilState(userState);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
    coupleCode: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ ...userData });
  }, []);

  const updateUserData = async () => {
    try {
      const response = await customAxios.put(
        "profile",
        // 수정할 데이터
        { ...formData },
      );
      setUserData({ ...formData });
      navigate("/mypage");
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 정보 입력
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const putSubmit = async (event) => {
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
      <div className={classes.profileImg}>
        <img src={userData.profileImg} alt='' />
      </div>
      <form onSubmit={putSubmit}>
        <InputForm
          label='이름'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <InputForm
          label='닉네임'
          name='nickname'
          value={formData.nickname}
          onChange={handleChange}
        />
        <InputForm
          label='전화번호'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='전화번호를 작성해주세요.'
          required
        />
        <button type='submit' className={classes.submitButton}>
          제출
        </button>
      </form>
      <button onClick={deleteProfile}>회원탈퇴</button>
    </div>
  );
};
export default EditProfile;
