import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";
import classes from "./Diary.module.css";
import DiaryHeader from "../../components/Diary/DiaryHeader";
import { PiPencilLineFill } from "react-icons/pi"

const Diary = () => {
  const [diaries, setDiaries] = useRecoilState(diaryState);
  const [loading, setLoading] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get("diary");
        
        if (response?.data?.result?.length > 0) {
          setDiaries(response.data.result);
        } else {
          setDiaries([]);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
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
      <DiaryHeader diaries={diaries} />
      </div>

      <hr style={{width:'80vw', marginBottom:'40px'}}/>

      <div className={classes.diary}>
        {diaries.length > 0 ? (
          diaries.slice().reverse().map((diary) => (
            <div key={diary.id} className={classes.diaryItem}>
              <Link key={diary.id} to={`/diary/${diary.id}`}>
                <img
                  src={diary.image ? diary.image : 'src/assets/test2.jpg'}
                  alt="image"
                  className={classes.diaryImage}
                />
                <p className={classes.title}>{diary.title}</p>
                <p className={classes.date}>{diary.date}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className={classes.none}>다이어리를 작성해주세요</div>
        )}
      </div>
      <div>
        {modalIsVisible ? (
          <CreateItem hide={hideModalHandler} />
        ) : (
          <button onClick={showModalHandler} className={classes.button}>
            <PiPencilLineFill />
          </button>
        )}
      </div>
    </div>
  );
};

export default Diary;
