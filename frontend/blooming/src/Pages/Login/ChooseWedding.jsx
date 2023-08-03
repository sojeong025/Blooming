import { useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";
import { useState } from "react";
import { customAxios } from "../../lib/axios";

export default function ChooseWedding() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  // 약혼자 확인
  const isFiance = async () => {
    try {
      const response = await customAxios.get("is-fiance");
      console.log(response);
      navigate("/home");
    } catch (error) {
      console.log("약혼자 없음");
      navigate("/share");
    }
  };

  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);
  const [resWeddingDate, setResWeddingDate] = useState();

  // 웨딩 정보 변경
  const handleChange = (e) => {
    const newWeddingDate = e.target.value;
    setWeddingDate(newWeddingDate);
    setResWeddingDate({
      weddingDate,
    });
  };

  // 웨딩 정보 POST 요청
  const saveWeddingDate = async () => {
    try {
      const response = await customAxios.post("wedding-date", {
        weddingDate,
      });
      console.log(response);
      console.log(resWeddingDate);
    } catch (error) {
      console.log("웨딩 정보 POST 에러: ", error);
      console.log("res", resWeddingDate);
      console.log(weddingDate);
    }
  };

  // 버튼 클릭 시 웨딩 정보 보내기
  const submitWeddingDate = () => {
    saveWeddingDate();
    isFiance();
  };

  return (
    <>
      <h3>{userData.name}님의 결혼식 날짜는 언제인가요?</h3>
      {/* 달력 바꿔줘 소정아 */}
      <input type='date' value={weddingDate} onChange={handleChange} />

      <div>
        <p>{weddingDate}가 맞나요?</p>
        <Button text='네' onClick={submitWeddingDate} />
      </div>

      <Button
        text='날짜 입력 건너뛰기'
        onClick={() => {
          setWeddingDate("");
          isFiance();
        }}
      />
    </>
  );
}
