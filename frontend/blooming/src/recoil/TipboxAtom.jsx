import { atom } from "recoil";

export const tipBox = atom({
    key: "Tipbox",
    default: [
      {
        id: 1,
        title: "상견례 체크 사항",
        content: "2023-07-24",
      },
    ],
  });