import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";

const WeddingDateInput = () => {
  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);

  const handleChange = (e) => {
    setWeddingDate(e.target.value);
  };

  return (
    <>
      <label htmlFor='weddingDate'>
        웨딩 날짜는 받아올거라 이거는 임시임 아니면 모달으로 바꿔야함
      </label>
      <p>
        <input type='date' value={weddingDate} onChange={handleChange} />
      </p>
    </>
  );
};

export default WeddingDateInput;
