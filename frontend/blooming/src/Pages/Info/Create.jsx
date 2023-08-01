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

function Create({onCreate}) {
  const [previewModalVisible, setPreviewModalVisible] = useState(false);

  function handlePreviewClick() {
    setPreviewModalVisible(true);
  }

  return(
    <div className='mainContainer'>
      <Main />
      <GroomInfo />
      <BriderInfo />
      <Invitation />
      <WeddingDay />
      <WeddingHall />
      <div>
        <button onClick={handlePreviewClick}>미리보기</button>
        <button>저장</button>
      </div>

      {previewModalVisible && (
        <PreviewModal onClose={() => setPreviewModalVisible(false)} />
      )}
    </div>
  )
}

export default Create;