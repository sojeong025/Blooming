import { atom, selector } from "recoil";

// 유저 데이터
export const userState = atom({
  key: "userState",
  default: {
    profileImg:
      "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg",
    username: "희영",
    nickname: "나는희영",
    gender: "FEMALE",
    coupleCode: "",
  },
});

// 유저의 커플 데이터
export const userCoupleState = atom({
  key: "userCoupleState",
  default: {},
});

// 유저 정보 가져오는 API, 커플 정보도 있으면 받아오기
// export const fetchUserState = selector({
//   key: "fetchUserState",
//   get: async (({set}) => {
//     try {
//       const response = await fetch('api')
//       const userDate = await response.json()

//       set(userState, userDate)
//     } catch (error) {
//       // 오류처리
//       console.log(error)
//     }
//   })
// });
