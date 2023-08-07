import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import classes from "./EditProfile.module.css";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import InputForm from "../../components/Common/InputText";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
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
      <form onSubmit={submitUpdate}>
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
        <button type='submit' className={classes.submitButton}>
          수정
        </button>
      </form>

      <a onClick={deleteProfile}>회원탈퇴</a>
    </div>
  );
};
export default EditProfile;
