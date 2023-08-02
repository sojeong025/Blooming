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
    },
    brider: {
      briderFatherName: '',
      briderFatherPhone: '',
      briderMotherName: '',
      briderMotherPhone: '',
    },
    invitation: {
      title: '',
      content: '',
    },
    weddingHall: {
      weddingHallName: '',
      floor: '',
      address: '',
    }
  },
});
