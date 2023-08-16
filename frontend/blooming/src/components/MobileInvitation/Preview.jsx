import { useRecoilValue } from 'recoil';
import { mobileInvitationState, mobileInvitationThemeState } from '../../recoil/MobileInvitationAtom';
import { useState, useEffect } from 'react';
import { VscChromeClose } from 'react-icons/vsc';
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiSolidMessageDots } from 'react-icons/bi'
import { useLocation } from 'react-router-dom';

import classes from './Preview.module.css';
import theme1 from './Create/theme1.module.css'
import theme2 from './Create/theme2.module.css'
import theme3 from './Create/theme3.module.css'
import theme4 from './Create/theme4.module.css'
import CalendarComponent from '../../components/Schedule/CalendarComponent'

const themes = [theme1, theme2, theme3, theme4];

const getMonthAndDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  return { month, day };
};

function Preview({ onClose, positionStyle, showPre=true, showCloseButton=true, isDetailPage = false }) {
  const invitationData = useRecoilValue(mobileInvitationState);
  const theme = useRecoilValue(mobileInvitationThemeState);
  const themeStyles = themes[theme - 1];
  const [dday, setDday] = useState(null);
  
  const calculateDday = (weddingDate) => {
    const now = new Date();
    const wedding = new Date(weddingDate);
    const diff = wedding - now;
    const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dday;
  };

  const themeColors = {
    1: theme.theme1 || "#FFFAF4",
    2: theme.theme1 || "#F7FDFF",
    3: theme.theme1 || "#F7F2E8",
    4: theme.theme1 || "#FFFCF9",
  };

  function renderMainTheme1() {
    return (
      <div className={`${themeStyles.main}`}>
        <p className={`${themeStyles.mainTitle}`}>WEDDING DAY</p>
        <p className={`${themeStyles.mainDday}`}>{dday ? "D-" + dday : "D-Day"}</p>
        <img
          src={invitationData.thumbnail ? invitationData.thumbnail : '/src/assets/Character/main.jpeg'}
          alt="thumbnail"
        />
        <p className={`${themeStyles.mainName}`}>{invitationData.groomName ? invitationData.groomName : '신랑'} <span style={{fontSize:'15px'}}>그리고</span> {invitationData.brideName ? invitationData.brideName : '신부'}</p>
        <p className={`${themeStyles.mainWedding}`}>
          {invitationData.date
            ? invitationData.date
            : '예식일'}{' '}
          <br />
          {invitationData.weddingHallName
            ? invitationData.weddingHallName
            : '예식장 명'}{' '}
          &nbsp; | &nbsp;{' '}
          {invitationData.floor ? invitationData.floor : '예식장 층 및 홀'}
        </p>
        <hr />        
      </div>
    );
  }

  
  function renderMainTheme2() {
    return (
      <div className={`${themeStyles.main}`}>
      <div className={`${themeStyles.mainName}`}>{invitationData.groomName ? invitationData.groomName : '신랑'} <br/>
        <span style={{fontSize:'15px'}}>그리고</span><br/>
        {invitationData.brideName ? invitationData.brideName : '신부'}
      </div>
      <img
        src={invitationData.thumbnail ? invitationData.thumbnail : '/src/assets/Couple/wedding3.jpg'}
        alt="thumbnail"
      />

      <div className={isDetailPage ? themeStyles.weddingDetail : themeStyles.wedding}>Wedding</div>

      <div className={`${themeStyles.mainWedding}`}>
        {invitationData.date
          ? invitationData.date
          : '예식일'}{' '}
        <br />
        {invitationData.weddingHallName
          ? invitationData.weddingHallName
          : '예식장 명'}{' '}
        &nbsp; | &nbsp;{' '}
        {invitationData.floor ? invitationData.floor : '예식장 층 및 홀'}
      </div>
      <hr />        
    </div>
    );
  }

  function renderMainTheme3() {
    return (
      <div className={`${themeStyles.main}`}>
      <div className={`${themeStyles.mainText}`}>
        <div className={`${themeStyles.mainText1}`}>시</div>
        <div>작</div>
      </div>
      <hr/>
      <div className={`${themeStyles.mainName}`}>{invitationData.groomName ? invitationData.groomName : '신랑'}  · {invitationData.brideName ? invitationData.brideName : '신부'}
      </div>
      <img
        src={invitationData.thumbnail ? invitationData.thumbnail : '/src/assets/Couple/wedding4.jpg'}
        alt="thumbnail"
      />

      <div className={`${themeStyles.mainWedding}`}>
        {invitationData.date
          ? invitationData.date
          : '예식일'}{' '}
        <br />
        {invitationData.weddingHallName
          ? invitationData.weddingHallName
          : '예식장 명'}{' '}
        &nbsp; | &nbsp;{' '}
        {invitationData.floor ? invitationData.floor : '예식장 층 및 홀'}
      </div>
      <hr />        
    </div>
    );
  }

  function renderMainTheme4() {
    const invitationDate = invitationData.date ? getMonthAndDate(invitationData.date) : null;
    return (
      <div className={`${themeStyles.main}`}>
        <div className={`${themeStyles.mainDay}`}>
          <div>{invitationDate ? invitationDate.month : '10'}</div>
          <div>월 </div>
          <div>{invitationDate ? invitationDate.day : '14'}</div>
          <div>일</div>
        </div>
        <img
          src={invitationData.thumbnail ? invitationData.thumbnail : '/src/assets/Couple/wedding2.jpg'}
          alt="thumbnail"
        />
        <div className={`${themeStyles.mainName}`}>{invitationData.groomName ? invitationData.groomName : '신랑'} 
          &nbsp; / &nbsp;{invitationData.brideName ? invitationData.brideName : '신부'}
        </div>


        <div className={`${themeStyles.mainWedding}`}>
          {invitationData.date
            ? invitationData.date
            : '예식일'}{' '}
          <br />
          {invitationData.weddingHallName
            ? invitationData.weddingHallName
            : '예식장 명'}{' '}
          &nbsp; | &nbsp;{' '}
          {invitationData.floor ? invitationData.floor : '예식장 층 및 홀'}
        </div>
        <hr />        
      </div>
    );
  }

  

  const previewStyle = {
    backgroundColor: themeColors[theme] || "##FFFAF4",
  };
  console.log(theme)
  

  useEffect(() => {
    if (invitationData.date) {
      setDday(calculateDday(invitationData.date));
    } else {
      setDday(null);
    }
  }, [invitationData.date]);

  return (
    <div className={classes.total} style={positionStyle}>
      {showPre && <p className={classes.pre}>미리보기</p> }
      {showCloseButton && <button onClick={onClose}><VscChromeClose size={24}/></button> }

      {/* 진짜 내용 */}
      <div
        className={`${classes.form} ${classes.styledForm}`}
        style={{ ...previewStyle, backgroundColor: themeColors[theme] || "rgb(250, 248, 246)" }}
      >

      {/* ---------메인-------- */}
      {theme === 1 && renderMainTheme1()}
      {theme === 2 && renderMainTheme2()}
      {theme === 3 && renderMainTheme3()}
      {theme === 4 && renderMainTheme4()}

      {/* --------인사말---------- */}
      <div className={`${classes.mention} ${theme === 3 ? themeStyles.theme3Font : ''}`}>
        <p className={classes.mentionTitle}>{invitationData.title ? invitationData.title : theme === 3 ? '초대합니다' : 'Invitation'}
        </p>
        <p className={classes.mentionContent}>{invitationData.content ? invitationData.content : '서로가 마주보며 다져온 사랑을 이제 함께 한 곳을 바라보며 걸어갈 수 있는 큰 사랑으로 키우고자 합니다. 저희 두 사람이 사랑의 이름으로 지켜나갈 수 있도록 앞날을 축복해 주시면 감사하겠습니다.'} </p>
        <hr className={theme === 2 ? themeStyles.mentionHrTheme2 : theme === 4 ? themeStyles.mentionHrTheme4 : theme === 3 ? themeStyles.mentionHrTheme3 : ''} />

      </div>


      {/* --------연락 관련-------- */}
      <div className={`${classes.connect} ${theme === 3 ? themeStyles.theme3Font : ''}`}>

        <div className={classes.connectName}>
          <div>{invitationData.groomFatherName ? invitationData.groomFatherName : '신랑아버지'} ∘ {invitationData.groomMotherName ? invitationData.groomMotherName : '신랑어머니'} <span style={{fontSize:'15px'}}>의 아들</span> {invitationData.groomName ?invitationData.groomName : '신랑'}</div> <br />
          <div>{invitationData.brideFatherName ? invitationData.brideFatherName : '신부아버지'} ∘ {invitationData.brideMotherName ? invitationData.brideMotherName :  '신부어머니'} <span style={{fontSize:'15px'}}>의 딸</span> {invitationData.brideName ? invitationData.brideName : '신부'}</div>
          <div className={`${classes.connectImg} ${theme === 4 ? themeStyles.connectImgTheme4 : theme === 2 ? themeStyles.connectImgTheme2 : theme === 3 ? themeStyles.connectImgTheme3 : ''}`}>
            소중한 당신을 초대합니다
          </div>
        </div>

        <div className={classes.connectCouple}>
          <div className={classes.connectCall}>
            <div className={classes.connectCallGroom}>신랑에게 연락하기</div> 
            <div className={classes.connectIconGroom}><BsFillTelephoneFill size={20} /></div>
            <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
          </div>

          <div className={classes.connectCall}>
            <div className={classes.connectCallGroom} >신부에게 연락하기</div> 
            <div className={classes.connectIconBrider}><BsFillTelephoneFill size={20} /></div>
            <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
          </div>
        </div>

        <div className={classes.connectParent}>
        <div className={`${classes.connectParentImg} ${theme === 2 ? themeStyles.connectParentImg4 : theme === 3 ? themeStyles.connectParentImg3 : ''}`}>혼주에게 연락하기</div>

          
          <div className={classes.connectParentPhone}>
            <div>
              <div className={classes.par}> 신랑 측 혼주 </div> 
                <div className={classes.parent}>아버지 <span style={{fontWeight:'bold'}}>{invitationData.groomFatherName ? invitationData.groomFatherName : '신랑아버지'}</span></div> 
                <div className={classes.connecticons}>
                  <div className={classes.connectIconGroom}><BsFillTelephoneFill size={20} /></div>
                  <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                </div>
                <div className={classes.parent} >어머니 <span style={{fontWeight:'bold'}}>{invitationData.groomMotherName ? invitationData.groomMotherName : '신랑어머니'} </span></div>
                <div className={classes.connecticons}>
                  <div className={classes.connectIconGroom}><BsFillTelephoneFill size={20} /></div>
                  <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                </div>
            </div>

            <div>
              <div className={classes.par2}> 신부 측 혼주 </div> 
                <div className={classes.parent}>아버지 <span style={{fontWeight:'bold'}}>{invitationData.bridedFatherName ? invitationData.bridedFatherName : '신부아버지'}</span></div>
                  <div className={classes.connecticons}>
                    <div className={classes.connectIconBrider}><BsFillTelephoneFill size={20} /></div>
                    <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                  </div> 
                <div className={classes.parent}>어머니 <span style={{fontWeight:'bold'}}>{invitationData.bridedMotherName ? invitationData.bridedMotherName : '신부어머니'} </span></div><div className={classes.connecticons}>
                  <div className={classes.connecticons}>
                    <div className={classes.connectIconBrider}><BsFillTelephoneFill size={20} /></div>
                    <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>

      {/* 캘린더 - 수정해야함 */}
      {/* <div className={classes.calendar}> */}
        {/* <CalendarComponent /> */}
      {/* </div> */}
    </div>
    </div>
  );
}

export default Preview;
