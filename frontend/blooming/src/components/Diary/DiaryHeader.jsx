import HTMLFlipBook from "react-pageflip";
import classes from "./DiaryHeader.module.css";
import { HiOutlineLockClosed } from "react-icons/hi"

function DiaryHeader(props) {
  const { diaries } = props;

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
      </div>
      
      {/* 컨텐츠 페이지 */}
      {diaries.map((diary) => (
        <div key={diary.id} className={classes.demoPage}>
          <div className={classes.image}>
            <img src={diary.image ? diary.image : "/src/assets/diary2.jpg"} width={150} height={140} alt="" />
          </div>
          <div className={classes.content}>
            {diary.content}
          </div>
        </div>
      ))}


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
