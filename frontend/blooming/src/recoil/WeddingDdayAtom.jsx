import { atom, selector } from "recoil";
import dayjs from "dayjs";

// 웨딩 날짜 데이터
export const weddingDateState = atom({
  key: "weddingDateState",
  default: "",
});

export const weddingDdayState = atom({
  key: "weddingDdayState",
  default: "",
});

// 웨딩 날짜 디데이
export const weddingDdayCal = selector({
  key: "weddingDdayCal",
  get: ({ get }) => {
    const todayDate = dayjs().format("YYYY-MM-DD");
    const weddingDate = get(weddingDateState);

    if (weddingDate) {
      const myWeddingDate = dayjs(weddingDate);
      const weddingDiff = myWeddingDate.diff(todayDate, "day");
      return weddingDiff;
    }
    return null;
  },
});
