import { useEffect, useState } from "react";
import InputForm from "../../components/Common/InputText";
import { customAxios } from "../../lib/axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { useNavigate } from "react-router-dom";

const CoupleCode = () => {
  const [formData, setFormData] = useState({ name: "", coupleCode: "" });
  const [userData, setUserData] = useRecoilState(userState);
  const [coupled, setCoupled] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // 인증코드 확인
  const setCouple = async (event) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", formData);
      setCoupled(`${formData.name}님과 연결되었습니다.`);
      setUserData({ ...userData, coupleCode: formData.coupleCode });
      // console.log(userData);
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      setCoupled("잘못된 코드입니다");
    }
  };

  // 계속 버튼을 누르면 이동
  const goNext = () => {
    if (userData.coupleCode.toString().length === 8) {
      navigate("/join", {
        state: { pageTitle: "회원가입" },
      });
    }
  };

  return (
    <div className='mainContainer'>
      <h3>상대방의 이름과 커플 코드를 입력하세요</h3>
      <form onSubmit={setCouple}>
        <InputForm
          label='이름'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          autoFocus
        />
        <InputForm
          label='커플 코드'
          name='coupleCode'
          value={formData.coupleCode}
          onChange={handleChange}
          required
        />
        <button type='submit'>인증</button>
      </form>
      <div>{coupled}</div>
      {userData.coupleCode !== 0 ? (
        <button onClick={goNext}>계속</button>
      ) : (
        <></>
      )}
      <button
        onClick={() =>
          navigate("/join", {
            state: { pageTitle: "회원가입" },
          })
        }
      >
        건너뛰기
      </button>
    </div>
  );
};

export default CoupleCode;
