import { useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { userCoupleState, userState } from "../../recoil/ProfileAtom";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";
import { forwardRef, useEffect, useState } from "react";
import { customAxios } from "../../lib/axios";
import classes from "./Question.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function ChooseWedding() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  const [userCouple, setUserCouple] = useRecoilState(userCoupleState);

  // 약혼자 확인
  const isFiance = async () => {
    try {
      const response = await customAxios.get("my-fiance");
      setUserCouple(response.data.result[0]);
      navigate("/home");
    } catch (error) {
      console.log("약혼자 없음", error);
      navigate("/share", { state: { pageTitle: "회원가입" } });
    }
  };

  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chooseDate, setChooseDate] = useState();

  // 웨딩 정보 변경
  const handleChange = (e) => {
    const newWeddingDate = e.target.value;
    setWeddingDate(newWeddingDate);
  };

  // 웨딩 정보 보내기
  const submitWeddingDate = async () => {
    try {
      await setWeddingDate(dayjs(selectedDate).format("YYYY-MM-DD"));
      // await customAxios.post("wedding-date", {
      //   weddingDate,
      // });
    } catch (error) {
      console.log("웨딩 정보 POST 에러: ", error);
    }
    console.log(weddingDate);
    // isFiance();
  };

  // 아니 왜 date가 이전에 선택한 데이터냐고!!
  function dateChangeHandler(date) {
    setSelectedDate(date);
    console.log(dayjs(selectedDate).format("YYYY-MM-DD"));
  }
  function submitHandler() {
    const weddingDatePick = {
      weddingDate: dayjs(selectedDate).format("YYYY-MM-DD"),
    };
    console.log(weddingDatePick);
  }

  return (
    <div className={`'mainContainer' ${classes.goJoinContainer}`}>
      <div className={classes.titleText}>
        {userData.name}님의 결혼식 날짜는 언제인가요?
        <p
          className={classes.subText}
        >{`입력한 정보는 언제든 수정이 가능해요.`}</p>
      </div>

      <input type='date' value={weddingDate} onChange={handleChange} />
      {weddingDate && (
        <div>
          <p>{weddingDate}가 맞나요?</p>
          <Button text='다음' onClick={submitWeddingDate} />
        </div>
      )}

      <h1>---👷🏻‍♀️🚧개발중🚧👷🏻‍♂️🚬---</h1>
      {/* 데이트피커 */}
      <div className={classes.datePick}>
        <DatePicker
          dateFormat='yyyy-MM-dd'
          shouldCloseOnSelect
          selected={selectedDate}
          onChange={dateChangeHandler}
        />
      </div>

      <div className={classes.dateBtn} onClick={submitWeddingDate}>
        웨딩 날짜 저장하기
      </div>
      <div
        className={classes.dateBtn}
        onClick={() => {
          setWeddingDate("");
          isFiance();
        }}
      >
        아직 못정했어요
      </div>
    </div>
  );
}
