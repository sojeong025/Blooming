import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { ScheduleState } from '../../recoil/ScheduleStateAtom';
import { userState } from '../../recoil/ProfileAtom';
import DatePicker from 'react-datepicker'
import './DatePicker.css'
import classes from './NewTask.module.css';
import { customAxios } from '../../lib/axios';

function NewTask({ onCancel, onAddTask, selectedDate }) {
  const [ enteredTitle, setEnteredTitle ] = useState('');
  const [ enteredBody, setEnteredBody ] = useState('');
  const [ enteredDate, setEnteredDate ] = useRecoilState(ScheduleState);
  const [ enteredTime, setEnteredTime ] = useState(new Date());
  const user = useRecoilValue(userState)

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }
  
  function dateChangeHandler(date) {
    setEnteredDate(date);
  }

  function timeChangeHandler(date) {
    setEnteredTime(date);
  }

  async function submitHandler(event) {
    event.preventDefault()
    const formattedDate = `${enteredDate.getFullYear()}-${(enteredDate.getMonth() + 1).toString().padStart(2, '0')}-${enteredDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${enteredTime.getHours().toString().padStart(2, '0')}:${enteredTime.getMinutes().toString().padStart(2, '0')}`;

    const taskData = {
      title: enteredTitle,
      content: enteredBody,
      scheduleDate: formattedDate,
      scheduleTime: formattedTime,
      scehduledBy: user.gender,
      scheduleType: "PRI",
    };
    try {
      await customAxios.post('schedule', taskData)
      onAddTask(taskData);
    } catch (error) {
      console.log('스케쥴 등록 API 에러', error)
    }
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="date">날짜 선택</label>
        <DatePicker
          showPopperArrow={false}
          id="date"
          selected={enteredDate}
          onChange={dateChangeHandler}
          dateFormat="yyyy-MM-dd"
          required
        />
        <label htmlFor="time">시간 선택</label>
        <DatePicker
          showPopperArrow={false}
          id="time"
          selected={enteredTime}
          onChange={timeChangeHandler}
          dateFormat="HH:mm"
          required
        />
      </div>
      <div>
        <label htmlFor="title">일정 제목</label>
        <textarea id="title" required rows={1} onChange={titleChangeHandler} placeholder='제목을 입력하세요.' />
        <label htmlFor="body">일정 내용</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} placeholder='내용을 입력하세요.' />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={onCancel}>취소</button>
        <button type='submit' >추가</button>
      </div>
    </form>
  );
}

export default NewTask;