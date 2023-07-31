import { useState } from "react";
import classes from './Create.module.css';

import Main from "../../components/MobileInvitation/Create/Main";
import GroomInfo from "../../components/MobileInvitation/Create/GroomInfo";
import BriderInfo from "../../components/MobileInvitation/Create/BriderInfo";
import Invitation from '../../components/MobileInvitation/Create/Invitation';
import WeddingDay from '../../components/MobileInvitation/Create/WeddingDay';
import WeddingHall from "../../components/MobileInvitation/Create/WeddingHall";

function Create({  }) {

  return(
    <div className='mainContainer'>
      <Main />
      <GroomInfo />
      <BriderInfo />
      <Invitation />
      <WeddingDay />
      <WeddingHall />
      <div>
        <button>미리보기</button>
        <button>저장</button>
      </div>
    </div>
  )
}

export default Create;