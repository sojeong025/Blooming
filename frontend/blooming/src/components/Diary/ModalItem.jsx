import { useParams, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { diaryState } from '../../recoil/DiaryStateAtom';
import DatePicker from 'react-datepicker'
import './DatePicker.css'
import classes from './ModalItem.module.css'
import { customAxios } from "../../lib/axios";

function CreateItem({ hide, item }) {
  const [diaries, setDiaries] = useRecoilState(diaryState)
  const [ date, setDate ] = useState(new Date());
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [image, setImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false)
  
  useEffect(() => {
    if (item) {
      setDate(new Date(item.date))
      setTitle(item.title)
      setContent(item.content)
      setImage(item.image)
      setIsEditMode(true)
    }
  }, [item])

  function dateChangeHandler(date) {
    setDate(date);
  }

  function titleChangeHandler(event) {
    setTitle(event.target.value)
  }

  function contentChangeHandler(event) {
    setContent(event.target.value);
  }

  function imageChangeHandler(event) {
    const file = event.target.files[0];
    if (!file) {
      setImage('');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  const ItemData = {
    title: title,
    content: content,
    date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    image: image
  };

  function submitHandler(event) {
    event.preventDefault();
    if (!isEditMode) {
      const createDiary = async () => {
        try {
          const response = await customAxios.post("diary", ItemData);
          const customItemData = {
            id: response.data.result[0],
            title: ItemData.title,
            content: ItemData.content,
            date: ItemData.date,
            image: ItemData.image
          }
          setDiaries((existingData) => [customItemData, ...existingData]); // 아이템 만들기
        } catch (error) {
          console.error(error);
        }
      };
      createDiary();
      
    } else {
      const updateDiary = async () => {
        try {
          await customAxios.put("diary");
          setDiaries(diaries.map((diary) => {
            if (diary.id === Number(item.id)) {
              const ItemData = {
                id: diary.id,
                title: title,
                content: content,
                date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
                image: image
              }
              return ItemData
            }
            return diary
          }));
        } catch (error) {
          console.error(error);
        }
      };
      updateDiary();
    }
    hide();
  }

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div>
          <label htmlFor="date">날짜 선택</label>
          <DatePicker
            showPopperArrow={false}
            id="date"
            selected={date}
            onChange={dateChangeHandler}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div>
          <label htmlFor="title">일정</label>
          <textarea id="title" value={title} required rows={1} onChange={titleChangeHandler} placeholder='일정을 입력하세요.' />
        </div>
        <div>
          <label htmlFor="body">내용</label>
          <textarea id="body" value={content} required rows={10} onChange={contentChangeHandler} placeholder='내용을 입력하세요.' />
        </div>
        <div>
          <label htmlFor="image">이미지</label>
          <input
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
              style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '8px' }}
            />
          )}
        </div>
        <div className={classes.actions}>
          <button type='button' onClick={hide}>취소</button>
          {item ? <button name='action' value='edit' type="submit">수정</button> : <button name='action' value='add' type="submit">추가</button>}
        </div>
      </form>
      
    </>
    
  );
}

export default CreateItem;
