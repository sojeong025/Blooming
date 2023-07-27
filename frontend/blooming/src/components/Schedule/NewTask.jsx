import { useState } from 'react';
import DatePicker from 'react-datepicker'
import './DatePicker.css'
import classes from './NewTask.module.css';

function NewTask({onCancel, onAddTask, selectedDate}) {
  const [ enteredBody, setEnteredBody ] = useState('');
  const [ enteredDate, setEnteredDate ] = useState(selectedDate || new Date());

  console.log(selectedDate)
  function bodyChangeHandler(event) {
    setEnteredBody(event.target.value);
  }
  
  function dateChangeHandler(date) {
    setEnteredDate(date);
  }

  function submitHandler(event) {
    event.preventDefault();
    const taskData = {
      body: enteredBody,
      date: enteredDate,
    };
    onAddTask(taskData);
    onCancel();
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="date">날짜 선택</label>
        <DatePicker
          showPopperArrow={false}
          id="date"
          selected={enteredDate}
          onChange={dateChangeHandler}
          dateFormat="yyyy-MM-dd"
          required
        />
      </p>
      <p>
        <label htmlFor="body">일정이 뭐냐</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} placeholder='일정을 입력하세요.' />
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={onCancel}>취소</button>
        <button>추가</button>
      </p>
    </form>
  );
}

export default NewTask;