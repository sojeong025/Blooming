import { atom } from 'recoil';

export const diaryState = atom({
  key: 'diaryState',
  default: [],
});

export const fianceDiaryState = atom({
  key: 'fianceDiaryState',
  default: [],
});