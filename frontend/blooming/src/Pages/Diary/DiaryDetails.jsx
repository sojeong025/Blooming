import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import { useState } from "react";
import CreateItem from "../../components/Diary/ModalItem";
import { customAxios } from "../../lib/axios";

import classes from "./DiaryDetails.module.css"

const DiaryDetails = () => {

  // const [diaries, setDiaries] = useRecoilState(diaryState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  const diaries = [
    {
      id: 1,
      title: "Diary Entry 1",
      content: "오늘은 친구들과 멋진 하루를 보냈습니다...",
      date: "2023-08-11",
      image: {src: 'src/assets/test.jpg'}
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
          {/* <label htmlFor="image">이미지</label> */}
          {/* <input
            type="file"
            id="image"
            accept="image/*"
            onChange={imageChangeHandler}
            style={{ display: 'block', margin: '8px 0' }}
          />
          {image && (
            <img
              src={image}
              alt="preview"
            />
          )} */}
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
