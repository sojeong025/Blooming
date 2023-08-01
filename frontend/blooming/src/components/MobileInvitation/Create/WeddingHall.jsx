import { useState } from 'react';
// import Address from './Address';

import classes from './Common.module.css';

function WeddingHall() {
  // const [openAddressDialog, setOpenAddressDialog] = useState(false);

  return(
    <div className={classes.container}>
      <p className={classes.header}>예식장소</p>
      <hr />
      <div>
        <label htmlFor="name">예식작 명 <span className={classes.required} >(필수)</span></label>
        <input className={classes.inputField} id="name" required placeholder='웨딩 컨벤션' />

        <br />
        <label htmlFor="floor">층 및 홀 <span className={classes.required} >(필수)</span></label>
        <input className={classes.inputField} id="name" required placeholder='1층 그레이트홀' />

        <br />
        <label htmlFor="place">주소 <span className={classes.required} >(필수)</span></label>
        <input className={classes.inputField} id="place" required placeholder='선택시 주소 검색창이 노출됩니다.'
        />

        {/* {openAddressDialog && <Address onClose={() => setOpenAddressDialog(false)} />} */}

      </div>
    </div>
  )
}

export default WeddingHall;