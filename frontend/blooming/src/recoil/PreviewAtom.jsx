import { atom } from 'recoil';

export const imageListState = atom({
  key: 'imageListState',
  default: [
    { src: 'src/assets/Preview/1.jpg', caption: 'Image 1' },
    { src: 'src/assets/Preview/2.jpg', caption: 'Image 2' },
    { src: 'src/assets/Preview/3.jpg', caption: 'Image 3'},
  ],
});

export const invitationState = atom({
  key: "invitationState",
  default:  [
    { src: '/src/assets/test2.jpg', caption: 'Image 1', context: "어디서나 간편하게, <br/> <b>완벽한 청첩장</b>을 만들어보세요" },
    { src: '/src/assets/test.jpg', caption: 'Image 2', context: "사진과 문구만 준비한다면, <br/> <b>무료로</b> 누구나 제작 가능합니다" },
    { src: '/src/assets/test3.jpg', caption: 'Image 3', context: "10분만 투자하세요, <br/> <b>제작 즉시 사용 가능</b>합니다 "},
  ],
});