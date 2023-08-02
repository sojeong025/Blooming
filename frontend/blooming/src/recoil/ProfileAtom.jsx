import { atom } from "recoil";

// 유저 데이터
export const userState = atom({
  key: "userState",
  default: {
    email: "",
    gender: "",
    name: "",
    nickname: "",
    phoneNumber: "",
    profileImg: "",
  },
});

// 유저의 커플 데이터
export const userCoupleState = atom({
  key: "userCoupleState",
  default: {},
});
