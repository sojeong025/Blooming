import { atom } from 'recoil';

export const mobileInvitationState = atom({
  key: 'mobileInvitationState',
  default: {
    main: {
      thumbnail:'',
    },
    groom: {
      groomFatherName: '',
      groomFatherPhone: '',
      groomMotherName: '',
      groomMotherPhone: '',
      groomName:'',
      groomPhone:'',
    },
    brider: {
      briderFatherName: '',
      briderFatherPhone: '',
      briderMotherName: '',
      briderMotherPhone: '',
      briderName:'',
      briderPhone:'',
    },
    invitation: {
      title: '',
      content: '',
    },
    weddingHall: {
      weddingHallName: '',
      floor: '',
      address: '',
    },
    weddingDate: {
      date: '',
      time: '',
  },},
});

export const mobileCountState = atom({
  key: 'mobileCountState',
  default: 0,
});

export const mobileInvitationIdState = atom({
  key: "mobileInvitationIdState",
  default: "",
});