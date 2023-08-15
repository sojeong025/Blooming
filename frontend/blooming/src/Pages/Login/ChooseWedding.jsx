import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";
import { useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import classes from "./Question.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function ChooseWedding() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [userCouple, setUserCouple] = useRecoilState(userCoupleState);

  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);
  const [isChoose, setIsChoose] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  // 결혼식 날짜 조회
  const fetchWeddingDate = async () => {
    try {
      const response = await customAxios.get("wedding-date");
      setWeddingDate(response.data.result[0].weddingDate);
    } catch (error) {
      // console.log("결혼식 날짜 없음");
    }
  };
  useEffect(() => {
    fetchWeddingDate();
    if (!weddingDate || weddingDate === "null") {
      setIsChoose(false);
    } else {
      setIsChoose(true);
      const initDate = dayjs(weddingDate).toDate();
      setSelectedDate(initDate);
    }
  }, []);

  function dateChangeHandler(date) {
    setSelectedDate(date);
  }
  // 웨딩 정보 보내기
  const submitHandler = async () => {
    const updateDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const weddingDatePick = {
      weddingDate: updateDate,
    };
    try {
      await customAxios.post("wedding-date", {
        weddingDatePick,
      });
      setWeddingDate(updateDate);
      console.log(weddingDate);
      navigate("/my-page");
    } catch (error) {
      console.log("웨딩 정보 POST 에러: ", error);
    }
  };

  return (
    <div className={`${classes.chooseDateContainer}`}>
      <div className={classes.titleText}>
        {userData.name}님의 결혼식 날짜를 입력해주세요
      </div>
      <p className={classes.subText}>입력한 정보는 언제든 수정이 가능합니다.</p>
      {/* 데이트피커 */}
      <div className={classes.datePick}>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          shouldCloseOnSelect
          selected={selectedDate}
          onChange={dateChangeHandler}
        />
      </div>

      <button className={classes.SubmitBtn} onClick={submitHandler}>
        저장
      </button>
    </div>
  );
}
