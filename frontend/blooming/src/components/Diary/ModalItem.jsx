import { useState } from "react";
import { useRecoilState } from "recoil";
import { diaryState } from "../../recoil/DiaryStateAtom";
import DatePicker from "react-datepicker";
import "./DatePickerDiary.css";
import classes from "./ModalItem.module.css";
import { customAxios, fileAxios } from "../../lib/axios";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ko } from "date-fns/esm/locale";

function CreateItem({ hide, visible, item }) {
  const navigate = useNavigate();

  const [diaries, setDiaries] = useRecoilState(diaryState);
  const [date, setDate] = useState(item ? new Date(item.date) : new Date());
  const [title, setTitle] = useState(item ? item.title : "");
  const [content, setContent] = useState(item ? item.content : "");
  const [imageURL, setImageURL] = useState(item ? item.image : "");
  const [isEditMode] = useState(item ? true : false);

  const modalStyle = {
    display: visible ? "block" : "none",
  };

  function dateChangeHandler(date) {
    setDate(date);
  }

  function titleChangeHandler(event) {
    setTitle(event.target.value);
  }

  function contentChangeHandler(event) {
    setContent(event.target.value);
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await fileAxios.post("DIARY", formData);
        // console.log('다이어리 이미지 Url', imageURL)
        setImageURL(response.data.result[0].uploadImageUrl);
      } catch (error) {
        console.error("이미지 api 오류", error);
      }
    }
  };

  const ItemData = {
    title: title,
    content: content,
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`,
    image: imageURL,
  };

  async function submitHandler(event) {
    event.preventDefault();

    const createDiary = async () => {
      try {
        const response = await customAxios.post("diary", ItemData);
        navigate(`/diary/${response.data.result[0]}`);
      } catch (error) {
        console.error(error);
      }
    };

    const updateDiary = async () => {
      try {
        const customItemData = {
          id: Number(item.id),
          title: title,
          content: content,
          date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0",
          )}-${String(date.getDate()).padStart(2, "0")}`,
          image: imageURL,
        };
        await customAxios.put("diary", customItemData);
        setDiaries(
          diaries.map((diary) => {
            if (diary.id === Number(item.id)) {
              return customItemData;
            }
            return diary;
          }),
        );
        navigate("/diary");
      } catch (error) {
        console.error(error);
      }
      hide();
    };

    const postHandling = () => {
      if (!isEditMode) {
        return createDiary();
      } else {
        return updateDiary();
      }
    };

    await postHandling();
  }

  return (
    <div style={modalStyle}>
      <form className={classes.form} onSubmit={submitHandler}>
        {/* 버튼 사이 날짜 선택 자리 */}
        <div className={classes.actions}>
          <button type='button' onClick={hide}>
            <AiOutlineLeft />
          </button>

          <div className={classes.datePickerContainer}>
            <DatePicker
              showPopperArrow={false}
              id='date'
              selected={date}
              onChange={dateChangeHandler}
              dateFormat='yyyy-MM-dd'
              required
              locale={ko}
            />
          </div>
          <div className={classes.btn}>
            {item ? (
              <button name='action' value='edit' type='submit'>
                <AiOutlineCheck />
              </button>
            ) : (
              <button name='action' value='add' type='submit'>
                <AiOutlineCheck />
              </button>
            )}
          </div>
        </div>

        {/* 사진 등록 자리 */}
        <div className={classes.imageContainer}>
          <label className={classes.label} htmlFor='image'>
            +
          </label>
          <input
            className={classes.img}
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
          />
          <div>{imageURL ? <img src={imageURL} alt='preview' /> : null}</div>
        </div>

        {/* 일정 타이틀 및 내용 자리 */}
        <div className={classes.text}>
          <textarea
            className={classes.title}
            id='title'
            value={title}
            required
            rows={1}
            onChange={titleChangeHandler}
            placeholder='기념일을 입력하세요'
          />

          <hr />

          <textarea
            className={classes.context}
            id='body'
            value={content}
            required
            rows={50}
            onChange={contentChangeHandler}
            placeholder='상대방에게 전달하고 싶은 내용을 적어주세요.'
          />
        </div>
      </form>
    </div>
  );
}

export default CreateItem;
