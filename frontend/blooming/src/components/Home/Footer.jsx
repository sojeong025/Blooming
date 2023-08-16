import classes from "./Footer.module.css"

export default function Footer() {
  return (
    <div className={classes.total}>
      <hr />
      <div className={classes.container}>
        <div className={classes.blooming}>아이(동)유(니)</div>
        <div className={classes.text}>
          <div className={classes.text1}><b>주소</b> 부산광역시 강서구 녹산산업중로 333 SSAFY 201</div>
          <div className={classes.text1}><b>대표전화</b> 010-1234-5678</div>
          <div className={classes.text1}><b>사이트</b> www.blooming-wedding.com </div>
          <div className={classes.copy}>COPYRIGHT © Blooming</div>
        </div>
      </div>
    </div>
  )
}