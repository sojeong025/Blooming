import { useNavigate } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { useRecoilValue } from "recoil";
import { mobileInvitationState } from "../../recoil/MobileInvitationAtom";
import Preview from "../../components/MobileInvitation/Preview"
import classes from "./MobileInvitationDetail.module.css"
import { AiOutlineLeft } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { PiPencilLineFill } from "react-icons/pi"

function MobileInvitationDetail() {
  const navigate = useNavigate();
  const invitation = useRecoilValue(mobileInvitationState);
  const invitationId = invitation.id
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      await customAxios.delete(`invitation/${invitationId}`);
      navigate('/info/mobile-invitation')
    } catch (error) {
        console.error(error);
    }
  };
  

  return(
    <div style={{ backgroundColor: "#fff" }}>
      <div className={classes.actions}>
        <div className={classes.back}>
          <button onClick={handleGoBack}><AiOutlineLeft/></button>
        </div>

        <div className={classes.editdel}>
          <button><PiPencilLineFill/></button>
          <button onClick={handleDelete}><BsTrash/></button>
        </div>
      </div>

      <div className={classes.container}>
        <Preview 
        positionStyle={{
          "--preview-total-position":"relative",
          "--preview-total-transform":"none",
          }}
        isDetailPage={true}
        showPre={false}
        showCloseButton={false}
        className={classes.modal}
        />
      </div>

      <div className={classes.bottombtn}>
        <button>공유하기</button>
      </div>
    </div>
  )
}

export default MobileInvitationDetail;