import { atom, selector } from "recoil";

// 이건 더미다
export const userState = atom({
  key: "userState",
  default: {
    email: "이메일@kakao.com",
    gender: "FEMALE",
    name: "나이름",
    nickname: "나",
    phoneNumber: "11",
    profileImg: "",
  },
});
export const userCoupleState = atom({
  key: "userCoupleState",
  default: {
    email: "이메일@kakao.com",
    gender: "MALE",
    name: "너이름",
    nickname: "너",
    phoneNumber: "11",
    profileImg: "",
  },
});

// 유저 데이터
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
// export const userCoupleState = atom({
//   key: "userCoupleState",
//   default: {},
// });

// 신랑/신부 자동
export const userRoleState = selector({
  key: "userRoleState",
  get: ({ get }) => {
    const gender = get(userState).gender;
    return gender === "MALE" ? "신랑" : "신부";
  },
});

export const coupleRoleState = selector({
  key: "coupleRoleState",
  get: ({ get }) => {
    const gender = get(userCoupleState).gender;
    return gender === "MALE" ? "신랑" : "신부";
  },
});
