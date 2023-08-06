import { atom, selector } from "recoil";

// 유저 데이터
export const userState = atom({
  key: "userState",
  default: {
    email: "이메일@kakao.com",
    gender: "FEMALE",
    name: "이름",
    nickname: "닉네임",
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

// 신랑/신부
export const userRoleState = selector({
  key: "userRoleState",
  get: ({ get }) => {
    const gender = get(userState).gender;
    return gender === "MALE" ? "신랑" : "신부";
  },
});
