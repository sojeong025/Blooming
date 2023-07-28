import { atom } from "recoil";

// 일정에 따른 플랜
export const weddingPlanState = atom({
  key: "weddingPlanState",
  default: [
    {
      id: 1,
      totalDay: 210,
      plan: [
        // 목업용 데이터 5개임 다쓰면 지우고 밑에 전체 주석 해제하기
        {
          leftDay: 200,
          title: "웨딩홀 투어 및 계약",
          context: [],
          img: "src/assets/Character/d180.png",
        },
        {
          leftDay: 160,
          title: "드레스 투어 및 샵 확정",
          context: [],
          img: "src/assets/Character/d160.png",
        },
        {
          leftDay: 80,
          title: "웨딩 촬영",
          context: [""],
          img: "src/assets/Character/d80.png",
        },
        {
          leftDay: 0,
          title: "본식",
          context: ["결혼 축하드려용", "2", "3"],
          img: "src/assets/Character/dday.png",
        },
      ],

      // [
      // {
      //   leftDay: 210,
      //   title: "상견례",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 200,
      //   title: "웨딩홀 투어 및 계약",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 190,
      //   title: "허니문 예약",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 180,
      //   title: "스드메 계약",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 160,
      //   title: "드레스 투어 및 샵 확정",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 120,
      //   title: "신혼집 계약",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 110,
      //   title: "예물, 예복, 한복 계약",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 90,
      //   title: "촬영 가봉",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 80,
      //   title: "웨딩 촬영",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 70,
      //   title: "청첩장 제작",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 60,
      //   title: "본식 관련 섭외",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 50,
      //   title: "청첩장 발송",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 40,
      //   title: "예식 디테일, 식전 영상",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 30,
      //   title: "폐백",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 20,
      //   title: "본식 가봉",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 10,
      //   title: "부케 준비",
      //   context: [],
      //   img: "",
      // },
      // {
      //   leftDay: 1,
      //   title: "최종 점검",
      //   context: ["1", "2", "3"],
      //   img: "",
      // },
      // {
      //   leftDay: 0,
      //   title: "본식",
      //   context: ["결혼 축하드려용", "2", "3"],
      //   img: "",
      // },
      // ],
    },
    {
      id: 2,
      totalDay: 180,
      plan: [
        {
          leftDay: 180,
          title: "머하징",
        },
      ],
    },
  ],
});
