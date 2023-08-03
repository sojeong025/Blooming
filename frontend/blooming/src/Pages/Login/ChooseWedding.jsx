import { NavLink } from "react-router-dom";
import Button from "../../components/Login/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom";
import {
  weddingDateState,
  weddingDdayState,
} from "../../recoil/WeddingDdayAtom";
import { useEffect } from "react";
import dayjs from "dayjs";
import { customAxios } from "../../lib/axios";

export default function ChooseWedding() {
  const userData = useRecoilValue(userState);

  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);
  const [weddingDday, setWeddingDday] = useRecoilState(weddingDdayState);

  // 웨딩 정보 변경
  const handleChange = (e) => {
    const newWeddingDate = e.target.value;
    setWeddingDate(newWeddingDate);
  };

  // 웨딩 정보 보내기
  const submitWeddingDate = async () => {
    try {
      const response = await customAxios.post("wedding-date", {
        ...setWeddingDate,
      });
      console.log(response);
    } catch (error) {
      console.log("웨딩 정보 POST 에러: ", error);
    }
  };

  useEffect(() => {
    const updateWeddingDday = () => {
      const todayDate = dayjs().format("YYYY-MM-DD");
      const myWeddingDate = dayjs(weddingDate);
      const weddingDiff = myWeddingDate.diff(todayDate, "day");

      if (weddingDiff === 0) {
        setWeddingDday(0);
      } else if (weddingDiff) {
        setWeddingDday(weddingDiff);
      }
    };

    updateWeddingDday();
  }, [weddingDate]);

  return (
    <>
      <h3>{userData.name}님의 결혼식 날짜는 언제인가요?</h3>
      {/* 달력 바꿔줘 소정아 */}
      <input type='date' value={weddingDate} onChange={handleChange} />

      <div>
        <p>{weddingDate}가 맞나요?</p>
        <NavLink to={"/Share"}>
          <Button text='네' onClick={submitWeddingDate} />
        </NavLink>
      </div>
      {weddingDday}
    </>
  );
}
