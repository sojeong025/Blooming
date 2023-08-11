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
  // const [diaries, setDiaries] = useRecoilState(diaryState);
  const [loading, setLoading] = useState(true);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const diaries = [
    {
      id: 1,
      title: "Diary Entry 1",
      content: "오늘은 친구들과 멋진 하루를 보냈습니다...주절주절 주절주절주절주절 주절주절주절주절 주절주절주절주절주절주절주절주절주절주절주절주절 주절주절주절주절주절주절 주절주절주절주절 주절주절주절주절",
      date: "2023-08-11",
      image: "/src/assets/test.jpg"
    },
    {
      id: 2,
      title: "Diary Entry 2",
      content: "펫샵에 갔던 경험",
      date: "2023-08-12",
      image: "/src/assets/test2.jpg"
    },
    {
      id: 3,
      title: "Diary Entry 3",
      content: "주말에 다녀온 휴양지 이야기",
      date: "2023-08-18",
      image: "/src/assets/diary.jpg"
    },
    {
      id: 4,
      title: "Diary Entry 4",
      content: "독서 후 기록한 감상",
      date: "2023-08-25",
      image:"/src/assets/test3.jpg"
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get("diary");
        setDiaries(response.data.result[0]);
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
          <p>다이어리를 작성해주세요.</p>
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
