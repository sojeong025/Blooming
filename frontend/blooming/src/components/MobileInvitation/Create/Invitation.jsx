import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';

import classes from './Common.module.css';

function Invitation() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInvitation((preInvitation) => ({
      ...preInvitation,
      invitation: {
        ...preInvitation.invitation,
        [id]: value,
      },
    }));
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>모시는 글</p>
      <hr />

      <div>
        <label htmlFor="title">제목 <span className={classes.required}>(필수)</span></label><br/>
        <input
          className={classes.inputField}
          type="text"
          id="title"
          placeholder="초대합니다."
          value={invitation.invitation.title}
          onChange={handleInputChange}
        /><br/>

        <label htmlFor="content">내용 <span className={classes.required}>(필수)</span></label><br/>
        <button>샘플 인사말</button><br/>
        <textarea
          className={classes.inputField}
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={invitation.invitation.content}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>  
  )
}

export default Invitation;