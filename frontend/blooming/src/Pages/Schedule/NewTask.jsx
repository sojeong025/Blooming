import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil'
import { useLocation, useNavigate } from "react-router-dom";
import { ScheduleState } from '../../recoil/ScheduleStateAtom';
import { userState } from '../../recoil/ProfileAtom';
import DatePicker from 'react-datepicker'
import './DatePicker.css'
import classes from './NewTask.module.css';
import { customAxios } from '../../lib/axios';

function NewTask() {

  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state.task
  console.log(task)

  const [ enteredTitle, setEnteredTitle ] = useState('');
  const [ enteredBody, setEnteredBody ] = useState('');
  const [enteredDate, setEnteredDate] = useRecoilState(ScheduleState);
  const [enteredTime, setEnteredTime] = useState(new Date());
  const user = useRecoilValue(userState)

  const [time, setTime] = useState(new Date())
  useEffect(() => {
    if (task) {
      const [hours, minutes] = task.scheduleTime.split(':').map(Number);
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      setTime(newTime);
    }
  }, [task]);

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }

  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }
  
  function dateChangeHandler(date) {
    setEnteredDate(date);
  }

  function timeChangeHandler(time) {
    setEnteredTime(time);
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
      scheduledBy: user.gender,
      scheduleType: "PRI",
    };
    console.log(taskData)
    try {
      await customAxios.post('schedule', taskData)
      navigate('schedule')
    } catch (error) {
      console.log('스케쥴 등록 API 에러', error)
    }
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
        <button type='button' >취소</button>
        <button type='submit' >추가</button>
      </div>
    </form>
  );
}

export default NewTask;