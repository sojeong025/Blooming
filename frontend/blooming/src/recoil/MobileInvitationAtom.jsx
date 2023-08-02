import { atom } from 'recoil';

export const mobileInvitationState = atom({
  key: 'mobileInvitationState',
  default: {
    main: {
      thumbnail:'',
    },
    groom: {
      groomFatherName: '신랑아버지',
      groomFatherPhone: '010-0000-0000',
      groomMotherName: '신랑어머니',
      groomMotherPhone: '010-0000-0000',
      groomName:'신랑님 성함',
      groomPhone:'',
    },
    brider: {
      briderFatherName: '신부아버지',
      briderFatherPhone: '010-0000-0000',
      briderMotherName: '신부어머니',
      briderMotherPhone: '010-0000-0000',
      briderName:'신부님 성함',
      briderPhone:'',
    },
    invitation: {
      title: 'Invitation',
      content: '서로가 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며 걸어갈 수 있는 큰 사랑으로 키우고자 합니다. 저희 두 사람이 사랑의 이름으로 지켜나갈 수 있도록 앞날을 축복해 주시면 감사하겠습니다.',
    },
    weddingHall: {
      weddingHallName: '예식장 명',
      floor: '예식장 층 및 홀',
      address: '',
    }
  },
});
