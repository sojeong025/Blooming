import { atom } from 'recoil';

export const mobileInvitationState = atom({
  key: 'mobileInvitationState',
  default: {},
});

export const mobileInvitationThemeState = atom({
  key: 'mobileInvitationThemeState',
  default: 1,
});