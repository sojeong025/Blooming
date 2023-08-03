import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import { useState } from "react";
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";

const DiaryDetails = () => {

  const [diaries, setDiaries] = useRecoilState(diaryState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const diary = diaries.find((diary) => {
    if (diary.id === id) {
      return diary
    }
  })

  const pageTransition = {
    initial: { opacity: 0, x: 500 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const hideModalHandler = () => {
    setModalIsVisible(false);
  }
  
  const showModalHandler = () => {
    setModalIsVisible(true);
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
          await customAxios.delete("diary", id);
          setDiaries(diaries.map((diary) => {
            if (diary.id !== id) {
              return diary
            }
          }));
        } catch (error) {
          console.error(error);
        }
  }

  return (
    <motion.div initial="initial" animate="visible" variants={pageTransition} style={{marginTop:"56px"}}>
      {modalIsVisible ? <CreateItem hide={hideModalHandler} item={diary} /> :<><h2>{diary.title}</h2>
      <p>{diary.content}</p>
      <br />
      <p>{diary.date}</p>
      <button onClick={showModalHandler}>수정하기</button>
      <button onClick={handleDelete}>삭제하기</button>
      <button onClick={handleGoBack}>뒤로가기</button></>}
      
    </motion.div>
  );
};

export default DiaryDetails;
