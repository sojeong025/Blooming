import { useState } from "react";
import classes from './Create.module.css';
import Preview from "../../components/MobileInvitation/Preview";

import PreviewModal from '../../components/MobileInvitation/PreviewModal'

import Main from "../../components/MobileInvitation/Create/Main";
import GroomInfo from "../../components/MobileInvitation/Create/GroomInfo";
import BriderInfo from "../../components/MobileInvitation/Create/BriderInfo";
import Invitation from '../../components/MobileInvitation/Create/Invitation';
import WeddingDay from '../../components/MobileInvitation/Create/WeddingDay';
import WeddingHall from "../../components/MobileInvitation/Create/WeddingHall";

import { customAxios } from '../../lib/axios'
import { useRecoilValue } from 'recoil';
import { weddingDateState } from "../../recoil/WeddingDdayAtom"

function Create() {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    main: {},
    groom: {},
    brider: {},
    invitation: {},
    weddingDay: useRecoilValue(weddingDateState),
    weddingHall: {},
  });

  function handlePreviewClick() {
    setPreviewModalVisible(true);
  }

  function handleSaveClick() {
    // 서버에 데이터 전송 (POST 요청)
    customAxios.post("invitation", formData)
      .then(response => {
        console.log("저장이 완료되었습니다.");
        console.log(response.data);
      })
      .catch(error => {
        console.error("저장에 실패하였습니다.");
        console.error(error);
      });
  }

  return(
    <div className='mainContainer'>
      <Main formData={formData} setFormData={setFormData} />
      <GroomInfo formData={formData} setFormData={setFormData} />
      <BriderInfo formData={formData} setFormData={setFormData} />
      <Invitation formData={formData} setFormData={setFormData} />
      <WeddingDay formData={formData} setFormData={setFormData} />
      <WeddingHall formData={formData} setFormData={setFormData} />
      <div className={classes.btn}>
        <button className={classes.pre} onClick={handlePreviewClick}>미리보기</button>
        <button className={classes.save} onClick={handleSaveClick}>저장</button>
      </div>

      {previewModalVisible && (
        <PreviewModal onClose={() => setPreviewModalVisible(false)} />
      )}
    </div>
  )
}

export default Create;