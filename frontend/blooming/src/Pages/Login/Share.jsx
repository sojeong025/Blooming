import CopyToClipboardButton from "../../components/Login/CopyToClipboardButton";
import KakaoShareButton from "../../components/Login/KakaoShareButton";

import { useNavigate } from "react-router-dom";

import Button from "../../components/Login/Button";
import InputForm from "../../components/Common/InputText";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { weddingDateState, weddingDdayCal } from "../../recoil/WeddingDdayAtom";
import { userState } from "../../recoil/ProfileAtom";
import { customAxios } from "../../lib/axios";

export default function Share() {
  const navigate = useNavigate();

  // const weddingDdayCal = useRecoilValue(weddingDdayCal);
  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);

  const [userData, setUserData] = useRecoilState(userState);

  // 유저 정보 가져오기
  const fetchData = async () => {
    try {
      const response = await customAxios.get("profile");
      console.log(response.data.result[0]);
      // 유저 정보 저장
      setUserData(response.data.result[0]);
    } catch (error) {
      console.error("유저 정보 API 에러", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const verifyCode = userData.coupleCode;

  // 상대방 코드 확인
  const [formData, setFormData] = useState({
    name: "",
    coupleCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 인증코드 확인
  const [coupled, setCoupled] = useState();
  const [description, setDescription] = useState();
  const setCouple = async (event) => {
    event.preventDefault();
    try {
      await customAxios.post("couple-certification", formData);
      setDescription(`${formData.name}님이 맞나요?`);
      setCoupled(`${formData.name}님이 맞나요?`);

      console.log(userData);
    } catch (error) {
      console.log("추가 정보 POST 에러:", error);
      setDescription(`잘못된 코드입니다`);
    }
  };

  return (
    <div className='mainContainer'>
      <h3>{userData.name}님의 약혼자를 연결 후 블루밍을 시작해보세요.</h3>

      <div>
        <CopyToClipboardButton text={verifyCode}>
          <div style={{ padding: "10px" }}>
            <p>나의 코드 복사</p>
            <p style={{ textDecoration: "underline" }}>{verifyCode}</p>
          </div>
        </CopyToClipboardButton>

        <KakaoShareButton />
      </div>

      <p>or</p>
      <hr />

      <div>
        <p>상대방 코드로 연결하기</p>
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
          <Button type='submit' text='인증' />
        </form>
        {coupled}
        {description}
      </div>
      <br />
      <Button text='홈으로' onClick={() => navigate("/home")} />
    </div>
  );
}
