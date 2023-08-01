import { atom } from 'recoil';

export const DiaryState = atom({
  key: 'DiaryState',
  default: [
    { title: '구희영바보', content: '구구구구', date: '2023-07-31', image: 'src/assets/logo.png' },
    { title: '구희영바보', content: '구구구구', date: '2023-07-31', image: 'src/assets/logo.png' },
    { title: '구희영바보', content: '구구구구', date: '2023-07-31', image: 'src/assets/logo.png' },
    { title: '구희영바보', content: '구구구구', date: '2023-07-31', image: 'src/assets/logo.png' },
  ],
});
