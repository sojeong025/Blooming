import { useNavigate } from "react-router-dom";
import { customAxios, fileAxios } from "../../lib/axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { mobileInvitationState } from "../../recoil/MobileInvitationAtom";
import Preview from "../../components/MobileInvitation/Preview"
import classes from "./MobileInvitationDetail.module.css"
import { AiOutlineLeft } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"
import { PiPencilLineFill } from "react-icons/pi"
import { useEffect } from "react";
import html2canvas from "html2canvas";
import { userState } from "../../recoil/ProfileAtom";

function MobileInvitationDetail() {
  const user = useRecoilValue(userState)
  const navigate = useNavigate();
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);
  const invitationId = invitation.id
  const handleGoBack = () => {
    navigate(-1);
  };

  let url = "https://i9e104.p.ssafy.io/login";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get("invitation");
        if (response.data.result[0]) {
          setInvitation(response.data.result[0]);
        } else {
          setInvitation(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setInvitation]);

  const handleDelete = async () => {
    try {
      await customAxios.delete(`invitation/${invitationId}`);
      navigate('/info/mobile-invitation')
    } catch (error) {
        console.error(error);
    }
  };

  const captureDOM = async () => {
    const domElement = document.querySelector('.'+classes.container); // 캡쳐할 요소 선택
    try {
      const canvas = await html2canvas(domElement);
      const dataUrl = canvas.toDataURL('image/jpeg');

      const response = await fetch(dataUrl);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image', blob);
      const res = await fileAxios.post('INVITATION', formData);
      url = res.data.result[0].uploadImageUrl

      createKakaoButton();

    } catch (error) {
      console.log('캡쳐 중 오류가 발생했습니다.', error);
    }
  }
  
  const createKakaoButton = () => {
    if (window.Kakao) {
      // 카카오 스크립트가 로드된 경우 init
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("94f660d5b29760bb7ff5e51729ad26be");
      }
      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "블루밍, 모바일 청첩장",
          description: `${user.name}님의 청첩장`,
          imageUrl:url,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: "웹으로 이동",
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
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
        <button onClick={captureDOM} >공유하기</button>
      </div>
    </div>
  )
}

export default MobileInvitationDetail;