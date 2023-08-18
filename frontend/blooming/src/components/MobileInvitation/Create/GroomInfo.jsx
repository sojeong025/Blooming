import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function GroomInfo() {
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
      <p className={classes.header}>신랑측 정보</p>
      <hr className={classes.hr} />
      <p className={classes.bodytext} htmlFor="groomFatherName">아버님</p>
      <input
        autocomplete="off"
        className={classes.inputField}
        type="text"
        id="groomFatherName"
        placeholder="이름"
        value={invitation.groomFatherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        autocomplete="off"
        type="tel"
        id="groomFatherPhone"
        name="groomFatherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.groomFatherPhone}
        onChange={handleInputChange}
      />
      <br />
      <p className={classes.bodytext} htmlFor="groomMotherName">어머님</p>
      <input
        className={classes.inputField}
        autocomplete="off"
        type="text"
        id="groomMotherName"
        placeholder="이름"
        value={invitation.groomMotherName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        autocomplete="off"
        type="tel"
        id="groomMotherPhone"
        name="groomMotherPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.groomMotherPhone}
        onChange={handleInputChange}
      />

      <p className={classes.bodytext} htmlFor="groomName">신랑</p>
      <input
        className={classes.inputField}
        autocomplete="off"
        type="text"
        id="groomName"
        placeholder="이름"
        value={invitation.groomName}
        onChange={handleInputChange}
      />
      <input
        className={classes.inputField}
        autocomplete="off"
        type="tel"
        id="groomPhone"
        name="groomPhone"
        placeholder="전화번호"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        value={invitation.groomPhone}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default GroomInfo;
