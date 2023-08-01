import { atom, selector } from "recoil";
import axios from "axios";

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

// 에러 모달 관리
export const errorModalState = atom({
  key: "errorModalState",
  default: false,
});

// const token =
//   "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5MDg3MzIxMCwiZW1haWwiOiJsb3R1czAwMjhAa2FrYW8uY29tIn0.f2sQWOELmAcaBgUmadtilJGQNWoGuQphOFgp4ahXqguhPTCew-8sxJH2NZlNM93FE3ATLfOf4n5VkP4t0WXScg";
const token = "";

// 모르겠어
// const url = "http://43.200.254.50:8080/profile";
const url = "";

const headers = {
  // "Header-Name": "Header-Value",
  Authorization: "Bearer " + token,
};

// 유저 정보 가져오는 API
export const fetchUserState = selector({
  key: "fetchUserState",
  get: async ({ get }) => {
    try {
      const response = await axios.get(url, {
        headers,
      });

      // axios에서 받아온 응답은 response.data 에 있습니다.
      console.log(response.data);
      const userData = response.data;
      return userData;
    } catch (error) {
      // 오류처리
      console.log("에러모달띄우고싶다");
      console.error(error);
      return {};
    }
  },
});
