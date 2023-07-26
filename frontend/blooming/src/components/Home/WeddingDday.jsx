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
      // 시스템 시간으로 받아오기
      const todayDate = dayjs().format("YYYY-MM-DD"); // 오늘 날짜
      const myWeddingDate = dayjs(weddingDate); // weddingDate 포맷팅
      const weddingDiff = myWeddingDate.diff(todayDate, "day"); // day 차이 구하기

      if (weddingDiff === 0) {
        setWeddingDday(0);
      } else if (weddingDiff) {
        setWeddingDday(weddingDiff);
      }
    };

    updateWeddingDday();

    // 현재 컴포넌트에서 updateWeddingDday 함수를 매 초마다 업데이트하기 위해 사용됩니다.
    // 컴포넌트가 언마운트되거나 종속성이 변경될 때 이 작업을 정리하여 중단합니다.
    // 이 방법은 시계와 같은 실시간으로 변경되는 정보를 자주 업데이트하여 보여줄 때 사용됩니다.
    // const timer = setInterval(updateWeddingDday, 1000);

    // return () => {
    //   clearInterval(timer);
    // };
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
      <input type='date' value={weddingDate} onChange={handleChange} />

      <p>{renderScript()}</p>
    </>
  );
};

export default WeddingDday;
