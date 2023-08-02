import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function BriderInfo() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInvitation((preInvitation) => ({
      ...preInvitation,
      brider: {
        ...preInvitation.brider,
        [id]: value,
      },
    }));
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>신부측 정보</p>
      <hr />
      <label htmlFor="briderFatherName">아버님</label>
      <input
        className={classes.inputField}
        type="text"
        id="briderFatherName"
        placeholder="이름"
        value={invitation.brider.briderFatherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="briderFatherPhone"
        name="briderFatherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.brider.briderFatherPhone}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="briderMotherName">어머님</label>
      <input
        className={classes.inputField}
        type="text"
        id="briderMotherName"
        placeholder="이름"
        value={invitation.brider.briderMotherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="briderMotherPhone"
        name="briderMotherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.brider.briderMotherPhone}
        onChange={handleInputChange}
      />

      <label htmlFor="briderName">신부</label>
      <input
        className={classes.inputField}
        type="text"
        id="briderName"
        placeholder="이름"
        value={invitation.brider.briderName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="briderPhone"
        name="briderPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.brider.briderPhone}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default BriderInfo;
