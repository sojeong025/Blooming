import { atom } from "recoil";

// 일정에 따른 플랜
export const weddingPlanState = atom({
  key: "weddingPlanState",
  default: [
    {
      id: 1,
      totalDay: 210,
      plan: [
        {
          leftDay: 210,
          title: "상견례, 택일",
        },
        {
          leftDay: 200,
          title: "웨딩홀 투어 및 계약",
        },
        {
          leftDay: 190,
          title: "허니문 예약",
        },
        {
          leftDay: 180,
          title: "스드메 계약",
        },
        {
          leftDay: 160,
          title: "드레스 투어 및 샵 확정",
        },
        {
          leftDay: 120,
          title: "신혼집 계약",
        },
        {
          leftDay: 110,
          title: "예물, 예복, 한복 계약",
        },
        {
          leftDay: 90,
          title: "촬영 가봉",
        },
        {
          leftDay: 80,
          title: "웨딩 촬영",
        },
        {
          leftDay: 70,
          title: "청첩장 제작",
        },
        {
          leftDay: 60,
          title: "본식 관련 섭외",
        },
        {
          leftDay: 50,
          title: "청첩장 발송",
        },
        {
          leftDay: 40,
          title: "예식 디테일, 식전 영상",
        },
        {
          leftDay: 30,
          title: "폐백",
        },
        {
          leftDay: 20,
          title: "본식 가봉",
        },
        {
          leftDay: 10,
          title: "부케 준비",
        },
        {
          leftDay: 1,
          title: "최종 점검",
        },
        {
          leftDay: 0,
          title: "결혼축하해!",
        },
      ],
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
