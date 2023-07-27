import { atom } from 'recoil';

export const imageListState = atom({
  key: 'imageListState',
  default: [
    { src: 'src/assets/Preview/1.jpg', caption: 'Image 1' },
    { src: 'src/assets/Preview/2.jpg', caption: 'Image 2' },
    {src: 'src/assets/Preview/3.jpg', caption: 'Image 3'},
  ],
});