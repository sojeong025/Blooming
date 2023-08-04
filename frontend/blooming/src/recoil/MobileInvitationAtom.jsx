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
      date: new Date(),
      time: {
        hour: 0,
        minute: 0,
        second: 0,
      },
    },
  },
});
