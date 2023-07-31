import { useState } from 'react';
// import Address from './Address'

import classes from './Common.module.css';

function WeddingHall() {

  return(
    <div className={classes.container}>
      <p className={classes.header}>예식장소</p>
      <hr />
      <div>
        <label htmlFor="name">예식작 명 <span>(필수)</span></label>
        <input id="name" required placeholder='웨딩 컨벤션' />

        <br />
        <label htmlFor="floor">층 및 홀 <span>(필수)</span></label>
        <input id="name" required placeholder='1층 그레이트홀' />

        <br />
        <label htmlFor="place">주소 <span>(필수)</span></label>
        <input id="place" required placeholder='선택시 주소 검색창이 노출됩니다.' />

      </div>
    </div>
  )
}

export default WeddingHall;