import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useRecoilState} from "recoil"
import { diaryState } from '../../recoil/DiaryStateAtom'
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";
import classes from "./Diary.module.css"

const Diary = () => {
  
  const [diaries, setDiaries] = useRecoilState(diaryState)
  const [loading, setLoading] = useState(true)
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get("diary");
        // 유저 정보 저장
        setDiaries(response.data.result[0]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false)
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>
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
        <p>일단 다이어리 미리보기 들어감</p>
      </div>
      <div className={classes.diary}>
        {diaries.map((diary) => (
          <div key={diary.id} className={classes.diaryItem}>
          <Link key={diary.id} to={`/diary/${diary.id}`}>
            <img src={diary.image} alt='image' className={classes.diaryImage} />
            <p className={classes.title}>{diary.title}</p>
            <p className={classes.date}>{diary.date}</p>
          </Link>
          </div>
        ))}
      </div>
      <div>
        {modalIsVisible ? <CreateItem hide={hideModalHandler} /> :
          <button onClick={showModalHandler} className={classes.button}>
            +
          </button>
        }
      </div>
    </div>
  );
};

export default Diary;