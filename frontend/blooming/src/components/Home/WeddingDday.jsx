import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import {
  weddingDateState,
  weddingDdayState,
} from "../../recoil/WeddingDdayAtom";
// import "dayjs/locale/ko"; // 한국어 가져오기

export const WeddingDday = () => {
  const [weddingDate, setWeddingDate] = useRecoilState(weddingDateState);
  const [weddingDday, setWeddingDday] = useRecoilState(weddingDdayState);

  // 나중에 데이터에서 받아오기! 지금은 여기서 설정
  const handleChange = (e) => {
    const newWeddingDate = e.target.value; // input
    setWeddingDate(newWeddingDate);
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

    const timer = setInterval(() => {
      if (weddingDday === 0 || weddingDday === -1) {
        clearInterval(timer);
      } else {
        // setWeddingDate((prevState) =>
        //   dayjs(prevState).add(-1, "day").format("YYYY-MM-DD"),
        // );
      }
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [weddingDate]);

  // console.log(weddingDate, weddingDday);

  const renderScript = () => {
    if (!weddingDate) {
      return "아직 D-Day가 없어용";
    }

    if (weddingDday === 0) {
      return "D-day";
    } else if (weddingDday > 0) {
      return `D-${weddingDday}`;
    } else {
      return `D+${Math.abs(weddingDday)}`;
    }
  };

  return (
    <>
      <input style={{ visibility: "hidden" }} type='date' value={weddingDate} onChange={handleChange} readOnly />

      <p>{renderScript()}</p>
    </>
  );
};

export default WeddingDday;
