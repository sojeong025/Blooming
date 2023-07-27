import { atom } from "recoil";

export const ScheduleState = atom({
  key: 'ScheduleState',
  default: new Date(), // Date 객체를 default 값으로 사용
});
