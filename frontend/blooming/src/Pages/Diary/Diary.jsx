import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { diaryState, fianceDiaryState } from "../../recoil/DiaryStateAtom";
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";
import classes from "./Diary.module.css";
import DiaryHeader from "../../components/Diary/DiaryHeader";
import { PiPencilLineFill } from "react-icons/pi"
import { weddingDdayState } from "../../recoil/WeddingDdayAtom";
import { userCoupleState } from "../../recoil/ProfileAtom";

const Diary = () => {
  const weddingDday = useRecoilValue(weddingDdayState)
  const fiance = useRecoilValue(userCoupleState)
  const [diaries, setDiaries] = useRecoilState(diaryState);
  const [fianceDiaries, setFianceDiaries] = useRecoilState(fianceDiaryState)
  const [loading, setLoading] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("diary");
      
      if (response.status === 200) {
        setDiaries(response.data.result[0]);
        if (weddingDday === 0 && fiance?.name) {
          try {
            const res = await customAxios.get("your-diary");
            if (res.status === 200) {
              setFianceDiaries(res.data.result[0])
            } else if (res.status === 204) {
              console.log("약혼자의 다이어리가 없습니다.")
            }
          } catch (err) {
            console.log("약혼자 다이어리 받아오기 에러", err)
          }
        }
      }
    } catch (error) {
      console.error("나의 다이어리 받아오기 에러", error);
    }
    setLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }


  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showModalHandler() {
    setModalIsVisible(true);
  }

  return (
    <div className={classes.container}>
      <p className={classes.mainText}>Diary Preview</p>
      <div className={classes.preDiary}>
        <DiaryHeader diaries={diaries} fianceDiaries={fianceDiaries} />
      </div>

      <hr style={{width:'80vw', marginBottom:'40px'}}/>
      <div>내 다이어리</div>
      <div className={classes.diary}>
        {diaries.length > 0 ? (
          diaries.slice().reverse().map((diary) => (
            <div key={diary.id} className={classes.diaryItem}>
              <Link key={diary.id} to={`/diary/${diary.id}`}>
                <img
                  src={diary.image ? diary.image : 'src/assets/Icon/nopicture.png'}
                  alt="image"
                  className={classes.diaryImage}
                />
                <p className={classes.title}>{diary.title}</p>
                <p className={classes.date}>{diary.date}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className={classes.none}>
            내가 작성한 다이어리가 없습니다. <hr /> 다이어리를 작성하여 추억을 공유하세요.
          </div>
        )}
      </div>
      {fiance?.name ? 
        <>
          <div>약혼자 다이어리</div>
          <div className={classes.diary}>
            {fianceDiaries.length > 0 ? (
              fianceDiaries.slice().reverse().map((fianceDiary) => (
                <div key={fianceDiary.id} className={classes.diaryItem}>
                  <Link key={fianceDiary.id} to={`/diary/${fianceDiary.id}`}>
                    <img
                      src={fianceDiary.image ? fianceDiary.image : 'src/assets/Icon/nopicture.png'}
                      alt="image"
                      className={classes.diaryImage}
                    />
                    <p className={classes.title}>{fianceDiary.title}</p>
                    <p className={classes.date}>{fianceDiary.date}</p>
                  </Link>
                </div>
              ))
            ) : (
              <div className={classes.none}>
                약혼자가 작성한 다이어리가 없습니다. <hr /> 다이어리를 작성하여 추억을 공유하세요.
              </div>
            )}
          </div>
        </> :
          <div className={classes.none}>
            연결된 약혼자가 없습니다.<hr /> 약혼자를 연결하여 추억을 공유하세요.
          </div>}
      <div>
        <CreateItem hide={hideModalHandler} visible={modalIsVisible} fetchData={fetchData} />
        <button onClick={showModalHandler} className={classes.button}>
          <PiPencilLineFill />
        </button>
      </div>
    </div>
  );
};

export default Diary;
