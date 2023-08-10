import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Create.module.css";
import Preview from "../../components/MobileInvitation/Preview";

import PreviewModal from "../../components/MobileInvitation/PreviewModal";

import Main from "../../components/MobileInvitation/Create/Main";
import GroomInfo from "../../components/MobileInvitation/Create/GroomInfo";
import BriderInfo from "../../components/MobileInvitation/Create/BriderInfo";
import Invitation from "../../components/MobileInvitation/Create/Invitation";
import WeddingDay from "../../components/MobileInvitation/Create/WeddingDay";
import WeddingHall from "../../components/MobileInvitation/Create/WeddingHall";

import { customAxios } from "../../lib/axios";
import { useRecoilValue } from "recoil";
import { mobileInvitationState } from "../../recoil/MobileInvitationAtom";

function Create() {
  const navigate = useNavigate();

  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const formData = useRecoilValue(mobileInvitationState);

  function handlePreviewClick() {
    setPreviewModalVisible(true);
  }

  async function handleSaveClick() {
    const finalFormData = {
      thumbnail: formData.thumbnail,
      groomFatherName: formData.groomFatherName,
      groomFatherPhone: formData.groomFatherPhone,
      groomMotherName: formData.groomMotherName,
      groomMotherPhone: formData.groomMotherPhone,
      groomName: formData.groomName,
      groomPhone: formData.groomPhone,
      brideFatherName: formData.briderFatherName,
      brideFatherPhone: formData.briderFatherPhone,
      brideMotherName: formData.briderMotherName,
      brideMotherPhone: formData.briderMotherPhone,
      brideName: formData.briderName,
      bridePhone: formData.briderPhone,
      title: formData.title,
      content: formData.content,
      weddingHallName: formData.weddingHallName,
      floor: formData.floor,
      address: formData.address,
      date: formData.date,
      time: formData.time,
    };

    await customAxios
      .post("invitation", finalFormData)
      .then((response) => {
        console.log(finalFormData);
        console.log("성공했다~");
        console.log(response.data);

        navigate("/mobile-invitation-detail");
      })
      .catch((error) => {
        console.log("저장에 실패하였습니다.");
        console.log(finalFormData);

        console.error(error);
      });
  }

  return (
    <div className='mainContainer'>
      <Main />
      <GroomInfo />
      <BriderInfo />
      <Invitation />
      <WeddingDay />
      <WeddingHall />
      <div className={classes.btn}>
        <button className={classes.pre} onClick={handlePreviewClick}>
          미리보기
        </button>
        <button className={classes.save} onClick={handleSaveClick}>
          저장
        </button>
      </div>

      {previewModalVisible && (
        <PreviewModal onClose={() => setPreviewModalVisible(false)} />
      )}
    </div>
  );
}

export default Create;
