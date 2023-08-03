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
        <p className={classes.mainName}>{invitationData.groom.groomName === '' && '신랑'} <span style={{fontSize:'15px'}}>그리고</span> {invitationData.brider.briderName === '' && '신부'}</p>
        {/* <img src={Ring} alt="Ring Icon" style={{margin:'10px 0'}}/> */}
        <p className={classes.mainWedding}>
          일단 날짜 <br/>
          {invitationData.weddingHall.weddingHallName === '' && '예식장 명'} &nbsp; | &nbsp; {invitationData.weddingHall.floor === '' && '예식창 층 및 홀'}
        </p>
        <hr />        
      </div>

      {/* --------인사말---------- */}
      <div className={classes.mention}>
        <p className={classes.mentionTitle}> 🌿 {invitationData.invitation.title === '' && 'Invitation'} 🌿</p>
        <p className={classes.mentionContent}>{invitationData.invitation.content === '' && '서로가 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며 걸어갈 수 있는 큰 사랑으로 키우고자 합니다. 저희 두 사람이 사랑의 이름으로 지켜나갈 수 있도록 앞날을 축복해 주시면 감사하겠습니다.'} </p>
        <hr />
      </div>


      {/* --------연락 관련-------- */}
      <div className={classes.connect}>
        <div className={classes.connectName}>
          {invitationData.groom.groomFatherName === '' && '신랑아버지'} ∘ {invitationData.groom.groomMotherName === '' && '신랑어머니'} <span style={{fontSize:'12px'}}>의 아들</span> {invitationData.groom.groomName === '' && '신랑'} <br />
          {invitationData.brider.briderFatherName === '' && '신부아버지'} ∘ {invitationData.brider.briderMotherName === '' && '신부어머니'} <span style={{fontSize:'12px'}}>의 딸</span> {invitationData.brider.briderName === '' && '신부'}
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
            아버지 <span style={{fontWeight:'bold'}}>{invitationData.groom.groomFatherName === '' && '신랑아버지'}</span> <br /> 
            어머니 <span style={{fontWeight:'bold'}}>{invitationData.groom.groomMotherName === '' && '신랑어머니'} </span> <br /> 
            </p>

            <p>신부 측 혼주 <br /> 
            아버지 <span style={{fontWeight:'bold'}}>{invitationData.brider.briderFatherName === '' && '신부아버지'}</span> <br /> 
            어머니 <span style={{fontWeight:'bold'}}>{invitationData.brider.briderMotherName === '' && '신부어머니'}</span> <br /> 
            </p>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}

export default Preview;
