import { atom } from "recoil";

// 온보딩 이미지
export const imageListState = atom({
  key: "imageListState",
  default: [
    { src: "src/assets/Preview/1.jpg", caption: "메인화면-일정맞춤 팁 제공" },
    { src: "src/assets/Preview/2.jpg", caption: "일정-약혼자와 공유하는 일정" },
    {
      src: "src/assets/Preview/3.jpg",
      caption: "다이어리-일기 쓰고 결혼 후 제작",
    },
    { src: "src/assets/Preview/4.jpg", caption: "예약-각종 업체와 예약 연결" },
    { src: "src/assets/Preview/5.jpg", caption: "모바일 청첩장 제공" },
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
