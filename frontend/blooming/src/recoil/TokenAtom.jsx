import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState',
  default: null,
});

export const refreshTokenState = atom({
  key: 'refreshTokenState',
  default: null,
});