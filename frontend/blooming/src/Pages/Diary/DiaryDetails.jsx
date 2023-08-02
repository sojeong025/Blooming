import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import { useState } from "react";
import CreateItem from "../../components/Diary/ModalItem";

const DiaryDetails = () => {

  const diaries = useRecoilValue(diaryState);
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

  const handleGoBack = () => {
    navigate(-1);
  };

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showModalHandler() {
    setModalIsVisible(true);
  }

  return (
    <motion.div initial="initial" animate="visible" variants={pageTransition} style={{marginTop:"56px"}}>
      {modalIsVisible ? <CreateItem hide={hideModalHandler} item={diary} /> :<><h2>{diary.title}</h2>
      <p>{diary.content}</p>
      <br />
      <p>{diary.date}</p>
      <button onClick={showModalHandler}>update</button>
      <button onClick={handleGoBack}>X</button></>}
      
    </motion.div>
  );
};

export default DiaryDetails;
