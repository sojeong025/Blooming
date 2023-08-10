import HTMLFlipBook from "react-pageflip";
import classes from "./DiaryHeader.module.css";
import { HiOutlineLockClosed } from "react-icons/hi"

function DiaryHeader(props) {
  return (
    <HTMLFlipBook
      width={180}
      height={280}
      pageFlipDirection="rtl"
      responsive={true}
      usePortrait={false}
      swipeEnabled={true}
      showCover={true}
      drawShadow
    >
      {/* 커버 페이지 */}
      <div className={classes.cover}>
        <h1>웨딩 다이어리</h1>
      </div>
      
      {/* 컨텐츠 페이지 */}
      <div className={classes.demoPage}>
        <div className={classes.image}>
          <img src="/src/assets/diary2.jpg" width={150} height={140} alt="" />
        </div>
        <div className={classes.content}>
          나의 내용
        </div>
      </div>


      <div className={classes.demoPage2}>
        <div>
          <HiOutlineLockClosed className={classes.lock}/>
        </div>
        <div className={classes.blur}>
          <div className={classes.image}>
            <img src="/src/assets/diary.jpg" width={150} height={140} alt="" />
          </div>
          <div className={classes.content}>상대방 내용</div>
        </div>
      </div>
    </HTMLFlipBook>
  );
}

export default DiaryHeader;
