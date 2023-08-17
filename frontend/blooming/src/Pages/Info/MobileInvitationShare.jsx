import { customAxios } from "../../lib/axios";
import { BsFillTelephoneFill } from 'react-icons/bs'
import { BiSolidMessageDots } from 'react-icons/bi'
import classes from "./MobileInvitationShare.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function MobileInvitationShare() {

  const { id } = useParams();
  const [invitation, setInvitation] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`invitation/share/${id}`);
        if (response.data.result[0]) {
          setInvitation(response.data.result[0]);
        } else {
          setInvitation(null);
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setInvitation]);

  if (isLoading) {
    return <div>...loading</div>
  }

  return (
    <div className={classes.total} style={{
          "--preview-total-position":"relative",
          "--preview-total-transform":"none",
          }}>
      {/* 진짜 내용 */}
      <div
        className={`${classes.form} ${classes.styledForm}`}
        style={{backgroundColor: "#F7FDFF" || "rgb(250, 248, 246)"}}
      >

      {/* ---------메인-------- */}
        <div style={{ backgroundColor: "#fff" }}>
          <div className="theme2.main">
            <div className="theme2.mainName">{invitation.groomName} <br/>
              <span style={{fontSize:'15px'}}>그리고</span><br/>
              {invitation.brideName}
            </div>
            <img
              src={invitation.thumbnail}
              alt="thumbnail"
            />

            <div className="theme2.weddingDetail">Wedding</div>

            <div className="theme2.mainWedding">
              {invitation.date}
              <br />
              {invitation.weddingHallName}
              {invitation.floor}
            </div>
            <hr />        
          </div>
        </div>

      {/* --------인사말---------- */}
        <div className={classes.mention}>
          <p className={classes.mentionTitle}>{invitation.title}</p>
          <p className={classes.mentionContent}>{invitation.content} </p>
          <hr className="theme2.mentionHrTheme2" />

        </div>


      {/* --------연락 관련-------- */}
        <div className={classes.connect}>

          <div className={classes.connectName}>
            <div>{invitation.groomFatherName} ∘ {invitation.groomMotherName} <span style={{fontSize:'15px'}}>의 아들</span> {invitation.groomName}</div> <br />
            <div>{invitation.brideFatherName} ∘ {invitation.brideMotherName} <span style={{fontSize:'15px'}}>의 딸</span> {invitation.brideName}</div>
            <div className={classes.connectImg}>
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
          <div className={classes.connectParentImg}>혼주에게 연락하기</div>

          <div className={classes.connectParentPhone}>
            <div>
              <div className={classes.par}> 신랑 측 혼주 </div> 
                <div className={classes.parent}>아버지 <span style={{fontWeight:'bold'}}>{invitation.groomFatherName}</span></div> 
                <div className={classes.connecticons}>
                  <div className={classes.connectIconGroom}><BsFillTelephoneFill size={20} /></div>
                  <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                </div>
                <div className={classes.parent} >어머니 <span style={{fontWeight:'bold'}}>{invitation.groomMotherName} </span></div>
                <div className={classes.connecticons}>
                  <div className={classes.connectIconGroom}><BsFillTelephoneFill size={20} /></div>
                  <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                </div>
            </div>

            <div>
              <div className={classes.par2}> 신부 측 혼주 </div> 
                <div className={classes.parent}>아버지 <span style={{fontWeight:'bold'}}>{invitation.bridedFatherName}</span></div>
                  <div className={classes.connecticons}>
                    <div className={classes.connectIconBrider}><BsFillTelephoneFill size={20} /></div>
                    <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                  </div> 
                <div className={classes.parent}>어머니 <span style={{fontWeight:'bold'}}>{invitation.bridedMotherName} </span></div><div className={classes.connecticons}>
                  <div className={classes.connecticons}>
                    <div className={classes.connectIconBrider}><BsFillTelephoneFill size={20} /></div>
                    <div className={classes.connectIcon}><BiSolidMessageDots size={20} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileInvitationShare;