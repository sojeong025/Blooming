import { atom } from 'recoil';

export const diaryState = atom({
  key: 'diaryState',
  default: [
    { id: '', title: '', content: '', date: '', image: '' },
  ],
});
