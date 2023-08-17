import HTMLFlipBook from "react-pageflip";
import classes from "./DiaryHeader.module.css";
import { HiOutlineLockClosed } from "react-icons/hi";

function DiaryHeader(props) {
  const { diaries } = props;
  const { fianceDiaries } = props;

  const createElements = () => {
    const elements = [];
    const maxLength = Math.max(diaries.length, fianceDiaries.length);

    if (diaries.length === 0) {
      elements.push(
        <div key="empty_left" className={classes.demoPage}>
        </div>
      );
    } else {
      for (let i = 0; i < maxLength; i++) {
        if (diaries[i]) {
          elements.push(
            <div key={diaries[i].id} className={classes.demoPage}>
              <div className={classes.image}>
                <img
                  src={diaries[i].image ? diaries[i].image : "/src/assets/Icon/nopicture.png"}
                  width={150}
                  height={140}
                  alt=""
                />
              </div>
              <div className={classes.content}>{diaries[i].content}</div>
            </div>
          );
        } else {
          elements.push(
            <div key={`my_${diaries[i].id}`} className={classes.demoPage2}>
              <div>
                <HiOutlineLockClosed className={classes.lock} />
              </div>
              <div className={classes.blur}>
                <div className={classes.image}>
                  <img src="/src/assets/diary.jpg" width={150} height={140} alt="" />
                </div>
                <div className={classes.content2}><br /><br />더 작성한 다이어리가 <hr />없습니다.</div>
              </div>
            </div>
          );
        }

        if (fianceDiaries[i]) {
          elements.push(
            <div key={fianceDiaries[i].id} className={classes.demoPage}>
              <div className={classes.image}>
                <img
                  src={fianceDiaries[i].image ? fianceDiaries[i].image : "/src/assets/Icon/nopicture.png"}
                  width={150}
                  height={140}
                  alt=""
                />
              </div>
              <div className={classes.content}>{fianceDiaries[i].content}</div>
            </div>
          );
        } else {
          elements.push(
            <div key={`fiance_${fianceDiaries[i].id}`} className={classes.demoPage2}>
              <div>
                <HiOutlineLockClosed className={classes.lock} />
              </div>
              <div className={classes.blur}>
                <div className={classes.image}>
                  <img src="/src/assets/diary.jpg" width={150} height={140} alt="" />
                </div>
                <div className={classes.content2}><br /><br />더 작성한 다이어리가 <hr />없습니다.</div>
              </div>
            </div>
          );
        }
      }
      return elements;
    }
  

    return (
      <HTMLFlipBook
        width={180}
        height={280}
        pageFlipDirection="rtl"
        responsive={true}
        usePortrait={false}
        mobileScrollSupport={diaries.length === 0 || fianceDiaries.length === 0 ? false : true}
        showCover={true}
        disableFlipByClick={diaries.length === 0 || fianceDiaries.length === 0 ? true : false}
        drawShadow
      >
        {/* 커버 페이지 */}
        <div className={classes.cover}></div>

        {/* 컨텐츠 페이지 */}
        {createElements()}
      </HTMLFlipBook>
    );
  }
}

export default DiaryHeader;
