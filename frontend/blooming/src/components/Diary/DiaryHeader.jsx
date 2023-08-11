import React from "react";
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
      {diaries.map((diary, index) => (
        <React.Fragment key={diary.id}>
          <div className={classes.demoPage}>
            <div className={classes.image}>
              <img src={diary.image ? diary.image : "/src/assets/diary2.jpg"} width={150} height={140} alt="" />
            </div>
            <div className={classes.content}>
              {diary.content}
            </div>
          </div>
          {index % 2 === 0 && (
            <div className={classes.demoPage2}>
              <div>
                <HiOutlineLockClosed className={classes.lock}/>
              </div>
              <div className={classes.blur}>
                <div className={classes.image}>
                  <img src="/src/assets/diary.jpg" width={150} height={140} alt="" />
                </div>
                <div className={classes.content}>상대방은 무엇을 작성하였을까요?</div>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </HTMLFlipBook>
  );
}

export default DiaryHeader;

