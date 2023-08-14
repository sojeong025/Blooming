import { atom } from "recoil";

// 온보딩 이미지
export const imageListState = atom({
  key: "imageListState",
  default: [
    { src: "src/assets/Preview/on1.png", caption: "일정맞춤 알림 제공" },
    { src: "src/assets/Preview/on2.png", caption: "웨딩다이어리 실물 제작까지"},
    { src: "src/assets/Preview/on3.png", caption: "웨딩 업체와 예약 연결" },
    { src: "src/assets/Preview/on4.png", caption: "모바일 청첩장 제공까지" },
  ],
});

export const invitationState = atom({
  key: "invitationState",
  default: [
    {
      src: "/src/assets/test2.jpg",
      caption: "Image 1",
      context: "어디서나 간편하게, <br/> <b>완벽한 청첩장</b>을 만들어보세요",
    },
    {
      src: "/src/assets/test.jpg",
      caption: "Image 2",
      context:
        "사진과 문구만 준비한다면, <br/> <b>무료로</b> 누구나 제작 가능합니다",
    },
    {
      src: "/src/assets/test3.jpg",
      caption: "Image 3",
      context: "10분만 투자하세요, <br/> <b>제작 즉시 사용 가능</b>합니다 ",
    },
  ],
});
