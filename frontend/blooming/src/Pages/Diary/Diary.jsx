import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {useRecoilState} from "recoil"
import { diaryState } from '../../recoil/DiaryStateAtom'
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";

const Diary = () => {
  const [diaries, setDiaries] = useRecoilState(diaryState)

  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("diary");
      // 유저 정보 저장
      console.log(response.data.result)
      setDiaries(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {modalIsVisible ? <CreateItem hide={hideModalHandler} /> : <><button onClick={showModalHandler} style={buttonStyle}>
        &nbsp;+&nbsp;
      </button><div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: "16px" }}>
          {diaries.map((diary) => (
            <Link key={diary.id} to={`/diary/${diary.id}`}>
              <h2>{diary.title}</h2>
              <p>{diary.date}</p>
            </Link>
          ))}
        </div></>}
    </div>
  );
};

export default Diary;