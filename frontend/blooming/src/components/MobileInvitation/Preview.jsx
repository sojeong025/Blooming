import { useRecoilValue } from 'recoil';
import { mobileInvitationState } from '../../recoil/MobileInvitationAtom';

import classes from './Preview.module.css';

function Preview({ onClose }) {
  const invitationData = useRecoilValue(mobileInvitationState);

  return (
    <div className={classes.form}>
      미리보기 <button onClick={onClose}>X</button>

      <div>
        <h3>Main</h3>
        <p>썸네일: {invitationData.main.thumbnail}</p>
      </div>

      <div>
        <h3>Groom</h3>
        <p>아버님 이름: {invitationData.groom.groomFatherName}</p>
        <p>아버님 전화번호: {invitationData.groom.groomFatherPhone}</p>
        <p>어머님 이름: {invitationData.groom.groomMotherName}</p>
        <p>어머님 전화번호: {invitationData.groom.groomMotherPhone}</p>
      </div>

      <div>
        <h3>Bride</h3>
        <p>아버님 이름: {invitationData.brider.briderFatherName}</p>
        <p>아버님 전화번호: {invitationData.brider.briderFatherPhone}</p>
        <p>어머님 이름: {invitationData.brider.briderMotherName}</p>
        <p>어머님 전화번호: {invitationData.brider.briderMotherPhone}</p>
      </div>

      <div>
        <h3>Invitation</h3>
        <p>제목: {invitationData.invitation.title}</p>
        <p>내용: {invitationData.invitation.content}</p>
      </div>

      <div>
        <h3>Wedding Hall</h3>
        <p>예식장 명: {invitationData.weddingHall.weddingHallName}</p>
        <p>층 및 홀: {invitationData.weddingHall.floor}</p>
        <p>주소: {invitationData.weddingHall.address}</p>
      </div>
    </div>
  );
}

export default Preview;
