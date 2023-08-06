import { atom } from "recoil";

// 유저 데이터
export const userState = atom({
  key: "userState",
  default: {
    email: "더미@kakao.com",
    gender: "FEMALE",
    name: "더미3",
    nickname: "더미",
    phoneNumber: "11",
    profileImg: "",
  },
});
// export const userState = atom({
//   key: "userState",
//   default: {
//     email: "",
//     name: "",
//     nickname: "",
//     phoneNumber: "",
//     gender: "",
//   },
// });

// 유저의 커플 데이터
export const userCoupleState = atom({
  key: "userCoupleState",
  default: {},
});
