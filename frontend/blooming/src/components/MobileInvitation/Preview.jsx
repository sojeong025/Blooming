import { useRecoilValue } from 'recoil';
import { mobileInvitationState } from '../../recoil/MobileInvitationAtom';
import { weddingDateState } from "../../recoil/WeddingDdayAtom"

import Ring from '../../../src/assets/Icons/Ring4.svg'
import classes from './Preview.module.css';

function Preview({ onClose }) {
  const invitationData = useRecoilValue(mobileInvitationState, weddingDateState);

  return (
    <div className={classes.total}>
      미리보기 <button onClick={onClose}>X</button>

      {/* 진짜 내용 들어간다~ */}
      <div className={classes.form}>

      {/* ---------메인-------- */}
      <div className={classes.main}>
        <p className={classes.mainTitle}>WEDDING DAY</p>
        <p className={classes.mainDday}>D-30</p>
        <img src="../../../src/assets/Character/main.jpeg" alt="thumbnail" />
        {/* <p>{invitationData.main.thumbnail}</p> */}
        <p className={classes.mainName}>{invitationData.groom.groomName} <span style={{fontSize:'15px'}}>그리고</span> {invitationData.brider.briderName}</p>
        {/* <img src={Ring} alt="Ring Icon" style={{margin:'10px 0'}}/> */}
        <p className={classes.mainWedding}>
          일단 날짜 <br/>
          {invitationData.weddingHall.weddingHallName} &nbsp; | &nbsp; {invitationData.weddingHall.floor}
        </p>
        <hr />        
      </div>

      {/* --------인사말---------- */}
      <div className={classes.mention}>
        <p className={classes.mentionTitle}> 🌿 {invitationData.invitation.title} 🌿</p>
        <p className={classes.mentionContent}>{invitationData.invitation.content} </p>
        <hr />
      </div>


      {/* --------연락 관련-------- */}
      <div className={classes.connect}>
        <div className={classes.connectName}>
          {invitationData.groom.groomFatherName} ∘ {invitationData.groom.groomMotherName} <span style={{fontSize:'12px'}}>의 아들</span> {invitationData.groom.groomName} <br />
          {invitationData.groom.groomFatherName} ∘ {invitationData.groom.groomMotherName} <span style={{fontSize:'12px'}}>의 딸</span> {invitationData.brider.briderName}
          <div className={classes.connectImg}>소중한 당신을 초대합니다</div>
        </div>

        <div className={classes.connectCouple}>
          <p>신랑에게 연락하기 </p>
          <p>신부에게 연락하기 </p>
        </div>

        <div className={classes.connectParent}>
          <div className={classes.connectParentImg}>혼주에게 연락하기</div>
          
          <div className={classes.connectParentPhone}>
            <p>신랑 측 혼주 <br /> 
            아버지 <span style={{fontWeight:'bold'}}>{invitationData.groom.groomFatherName}</span> <br /> 
            어머니 <span style={{fontWeight:'bold'}}>{invitationData.groom.groomMotherName}</span> <br /> 
            </p>

            <p>신부 측 혼주 <br /> 
            아버지 <span style={{fontWeight:'bold'}}>{invitationData.brider.briderFatherName}</span> <br /> 
            어머니 <span style={{fontWeight:'bold'}}>{invitationData.brider.briderMotherName}</span> <br /> 
            </p>
          </div>

        </div>
      </div>

      {/*<div>
        <h3>Bride</h3>
        <p>아버님 이름: {invitationData.brider.briderFatherName}</p>
        <p>아버님 전화번호: {invitationData.brider.briderFatherPhone}</p>
        <p>어머님 이름: {invitationData.brider.briderMotherName}</p>
        <p>어머님 전화번호: {invitationData.brider.briderMotherPhone}</p>
      </div>

      <div>
        <h3>Wedding Hall</h3>
        <p>예식장 명: {invitationData.weddingHall.weddingHallName}</p>
        <p>층 및 홀: {invitationData.weddingHall.floor}</p>
        <p>주소: {invitationData.weddingHall.address}</p>
      </div>
      <div>
        <h3>Wedding Hall</h3>
        <p>예식장 명: {invitationData.weddingHall.weddingHallName}</p>
        <p>층 및 홀: {invitationData.weddingHall.floor}</p>
        <p>주소: {invitationData.weddingHall.address}</p>
      </div>
      <div>
        <h3>Wedding Hall</h3>
        <p>예식장 명: {invitationData.weddingHall.weddingHallName}</p>
        <p>층 및 홀: {invitationData.weddingHall.floor}</p>
        <p>주소: {invitationData.weddingHall.address}</p>
      </div> */}
    </div>
    </div>
  );
}

export default Preview;
