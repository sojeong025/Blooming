import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import { useState } from "react";
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";

import classes from "./DiaryDetails.module.css"

const DiaryDetails = () => {

  const [diaries, setDiaries] = useRecoilState(diaryState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const diary = diaries.find((diary) => {
    console.log(diary.id, id)
    if (`${diary.id}` === id) {
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
          await customAxios.delete(`diary/${id}`,);
          setDiaries(diaries.filter((diary) => 
            diary.id !== id
          ));
          navigate('/diary')
        } catch (error) {
          console.error(error);
        }
  }

  return (
    <motion.div initial="initial" animate="visible" variants={pageTransition} style={{marginTop:"56px"}}>
      {modalIsVisible ? <CreateItem hide={hideModalHandler} item={diary} /> :
        <div className={classes.form}>
          <div className={classes.actions}>
            <button onClick={handleGoBack}>뒤로가기</button>
            <p>{diary.date}</p>
            <button onClick={showModalHandler}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>


          <div className={classes.imageContainer}>
            <label className={classes.label} htmlFor="image">+</label>
            <input readOnly className={classes.img} 
              type="file" id="image" accept="image/*"
            />
            {image && (
              <img
                src={image}
                alt="preview"
              />
            )}
        </div>

        <div className={classes.text}>
          <textarea readOnly className={classes.title}>{diary.title}</textarea>
          <hr />
          <textarea readOnly className={classes.context}>{diary.content}</textarea>
        </div>
        </div>}
    </motion.div>
  );
};

export default DiaryDetails;
