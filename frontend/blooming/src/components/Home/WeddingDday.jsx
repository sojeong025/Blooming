import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { weddingDateState } from "../../recoil/WeddingDdayAtom";
// import "dayjs/locale/ko"; // 한국어 가져오기

export const WeddingDday = () => {
  const weddingDate = useRecoilValue(weddingDateState);
  const [weddingDday, setWeddingDday] = useState("");

  useEffect(() => {
    const updateWeddingDday = () => {
      const todayDate = dayjs(); // 오늘 날짜
      const weddingDdayDate = dayjs(weddingDate); // weddingDate 포맷팅
      const weddingDiff = weddingDdayDate.diff(todayDate, "day"); // day 차이 구하기

      if (weddingDiff === 0) {
        setWeddingDday("오늘"); // 차이가 0
      } else if (weddingDiff > 0) {
        setWeddingDday(`D-${weddingDiff}`); // D-
      } else {
        setWeddingDday(`D+${weddingDiff}`); // D+
      }
    };

    updateWeddingDday();

    // 현재 컴포넌트에서 updateWeddingDday 함수를 매 초마다 업데이트하기 위해 사용됩니다.
    // 컴포넌트가 언마운트되거나 종속성이 변경될 때 이 작업을 정리하여 중단합니다.
    // 이 방법은 시계와 같은 실시간으로 변경되는 정보를 자주 업데이트하여 보여줄 때 사용됩니다.
    const timer = setInterval(updateWeddingDday, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [weddingDate]);

  return (
    <>
      <p>{weddingDday}</p>
    </>
  );
};

export default WeddingDday;
