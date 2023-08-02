import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function GroomInfo() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInvitation((preInvitation) => ({
      ...preInvitation,
      groom: {
        ...preInvitation.groom,
        [id]: value,
      },
    }));
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>신랑측 정보</p>
      <hr />
      <label htmlFor="groomFatherName">아버님</label>
      <input
        className={classes.inputField}
        type="text"
        id="groomFatherName"
        placeholder="이름"
        value={invitation.groom.groomFatherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="groomFatherPhone"
        name="groomFatherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.groom.groomFatherPhone}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="groomMotherName">어머님</label>
      <input
        className={classes.inputField}
        type="text"
        id="groomMotherName"
        placeholder="이름"
        value={invitation.groom.groomMotherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="groomMotherPhone"
        name="groomMotherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.groom.groomMotherPhone}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default GroomInfo;
