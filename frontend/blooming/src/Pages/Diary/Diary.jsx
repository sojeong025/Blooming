import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useRecoilState} from "recoil"
import { diaryState } from '../../recoil/DiaryStateAtom'
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";

const Diary = () => {
  const diaries = [
    {
      id: 1,
      title: "Diary Entry 1",
      content: "오늘은 친구들과 멋진 하루를 보냈습니다...",
      date: "2023-08-11",
      image: {src: 'src/assets/test3.jpg'}
    },
    {
      id: 2,
      title: "Diary Entry 2",
      content: "펫샵에 갔던 경험",
      date: "2023-08-12",
      image: {src: 'src/assets/test3.jpg'}
    },
    {
      id: 3,
      title: "Diary Entry 3",
      content: "주말에 다녀온 휴양지 이야기",
      date: "2023-08-18",
      image: {src: 'src/assets/test3.jpg'}
    },
    {
      id: 4,
      title: "Diary Entry 4",
      content: "독서 후 기록한 감상",
      date: "2023-08-25",
      image: {src: 'src/assets/test3.jpg'}
    }
  ];
  // const [diaries, setDiaries] = useRecoilState(diaryState)
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

  const buttonStyle = {
    position: "fixed",
    bottom: "80px",
    right: "24px",
    backgroundColor: "#f5f5f7",
    border: "none",
    borderRadius: "50%",
    padding: "8px",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: "1000",
  };

  return (
    <div style={{ marginTop: "56px" }}>
      {modalIsVisible ? <CreateItem hide={hideModalHandler} /> :
        <>
          <button onClick={showModalHandler} style={buttonStyle}>
            &nbsp;+&nbsp;
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "16px" }}>
            {diaries.map((diary) => (
              <Link key={diary.id} to={`/diary/${diary.id}`}>
                <h2>{diary.id}</h2>
                <h2>{diary.title}</h2>
                <p>{diary.date}</p>
              </Link>
            ))}
          </div>
        </>}
    </div>
  );
};

export default Diary;