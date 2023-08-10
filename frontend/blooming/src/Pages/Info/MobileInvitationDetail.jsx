import { useNavigate } from "react-router-dom";
import { mobileInvitationIdState } from "../../recoil/MobileInvitationAtom";
import { customAxios } from "../../lib/axios";
import { useRecoilValue } from "recoil";
import Preview from "../../components/MobileInvitation/Preview"
import classes from "./MobileInvitationDetail.module.css"

function MobileInvitationDetail() {
  const navigate = useNavigate();
  const invitationId = useRecoilValue(mobileInvitationIdState);

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
    <div className={classes.container}>
      <Preview 
      positionStyle={{
        "--preview-total-position":"relative",
        "--preview-total-transform":"none",
        }}
      showPre={false}
      showCloseButton={false}
      className={classes.modal}
      />
      <button onClick={handleGoBack}>뒤로가기</button>
      <button>수정하기</button>
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  )
}

export default MobileInvitationDetail;