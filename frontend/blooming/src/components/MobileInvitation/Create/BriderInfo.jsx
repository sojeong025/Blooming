import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function BriderInfo() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInvitation((preInvitation) => ({
      ...preInvitation,
      [id]: value,
    }));
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>신부측 정보</p>
      <hr />
      <label htmlFor="brideFatherName">아버님</label>
      <input
        className={classes.inputField}
        type="text"
        id="brideFatherName"
        placeholder="이름"
        value={invitation.brideFatherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="brideFatherPhone"
        name="brideFatherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.brideFatherPhone}
        onChange={handleInputChange}
      />
      <br />
      <label htmlFor="brideMotherName">어머님</label>
      <input
        className={classes.inputField}
        type="text"
        id="brideMotherName"
        placeholder="이름"
        value={invitation.brideMotherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="brideMotherPhone"
        name="brideMotherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.brideMotherPhone}
        onChange={handleInputChange}
      />

      <label htmlFor="brideName">신부</label>
      <input
        className={classes.inputField}
        type="text"
        id="brideName"
        placeholder="이름"
        value={invitation.brideName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        type="tel"
        id="bridePhone"
        name="bridePhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.bridePhone}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default BriderInfo;
