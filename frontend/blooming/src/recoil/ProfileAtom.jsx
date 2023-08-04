import { atom } from "recoil";

// 유저 데이터
export const userState = atom({
  key: "userState",
  default: {
    email: "lotus0028@kakao.com",
    name: "gdgd",
    nickname: "희영",
    phoneNumber: "12334",
    gender: "FEMALE",
    coupleCode: 0,
  },
});

// 유저의 커플 데이터
export const userCoupleState = atom({
  key: "userCoupleState",
  default: {},
});
