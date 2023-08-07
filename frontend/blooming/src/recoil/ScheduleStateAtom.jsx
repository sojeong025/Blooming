import { atom } from "recoil";

export const ScheduleState = atom({
  key: 'ScheduleState',
  default: new Date(), // Date 객체를 default 값으로 사용
});

export const ScheduleTaskState = atom({
  key: 'ScheduleTaskState',
  default: [],
});

export const schedulesState = atom({
  key: "schedulesState",
  default: [
    // 나중에 key값 문자열 수정
    {
      id: 1,
      title: "임시1",
      date: "2023-07-24",
      type: "공통",
    },
    {
      id: 2,
      title: "임시2",
      date: "2023-07-26",
      type: "공통",
    },
    {
      id: 3,
      title: "임시3",
      date: "2024-07-28",
      type: "공통",
    },
  ],
});
