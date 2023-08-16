import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import { ScheduleState } from "../../recoil/ScheduleStateAtom";
import { userState } from "../../recoil/ProfileAtom";
import DatePicker from "react-datepicker";
import "./DatePickerSchedule.css";
import classes from "./NewTask.module.css";
import { customAxios } from "../../lib/axios";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { PiPencilLineFill } from "react-icons/pi";
import {
  BsTrash,
  BsCalendarCheck,
  BsClock,
  BsReverseLayoutTextSidebarReverse,
} from "react-icons/bs";
import { ko } from "date-fns/esm/locale";

function NewTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredDate, setEnteredDate] = useRecoilState(ScheduleState);
  const [enteredTime, setEnteredTime] = useState(new Date());
  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log(task);
    if (task) {
      setEnteredTitle(task.title);
      setEnteredBody(task.content);
      setEnteredDate(new Date(task.scheduleDate));

      const [hours, minutes] = task.scheduleTime.split(":").map(Number);
      const newTime = new Date();
      newTime.setHours(hours);
      newTime.setMinutes(minutes);
      setEnteredTime(newTime);
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

  const handleHistory = () => {
    navigate(-1);
  };

  async function submitHandler(event) {
    event.preventDefault();
    const formattedDate = `${enteredDate.getFullYear()}-${(
      enteredDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${enteredDate.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${enteredTime
      .getHours()
      .toString()
      .padStart(2, "0")}:${enteredTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const taskData = {
      title: enteredTitle,
      content: enteredBody,
      scheduleDate: formattedDate,
      scheduleTime: formattedTime,
      scheduledBy: user.gender,
      scheduleType: "PRI",
    };

    if (task) {
      const updateTaskData = {
        id: task.id,
        title: enteredTitle,
        content: enteredBody,
        scheduleDate: formattedDate,
        scheduleTime: formattedTime,
      };
      try {
        await customAxios.put("schedule", updateTaskData);
        navigate(`/schedule/${task.id}`);
      } catch (error) {
        console.log("스케쥴 수정 API 에러", error);
      }
    } else {
      try {
        await customAxios.post("schedule", taskData);
        navigate("/schedule");
      } catch (error) {
        console.log("스케쥴 등록 API 에러", error);
      }
    }
  }

  async function deleteHandler() {
    if (task) {
      try {
        await customAxios.delete(`schedule/${task.id}`);
        navigate("/schedule");
      } catch (error) {
        console.log("스케쥴 삭제 API 에러", error);
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* ---------버튼 부분-------- */}
      <div className={classes.actions}>
        <button type='button' onClick={handleHistory}>
          <AiOutlineLeft />
        </button>
        {task ? (
          <>
            <button type='submit'>
              <AiOutlineCheck />
            </button>
          </>
        ) : (
          <button type='submit'>
            <AiOutlineCheck />
          </button>
        )}
      </div>

      {/* ---------제목 입력 부분-------- */}
      <div className={classes.mainTitle}>
        <input
          className={`${classes.title} ${classes.inputField}`}
          id='title'
          autoFocus
          required
          // rows={1}
          onChange={titleChangeHandler}
          placeholder='일정 제목'
          value={enteredTitle}
        />
      </div>

      {/* ---------날짜 선택 부분-------- */}
      <div className={`${classes.date} schedule`}>
        <BsCalendarCheck className={classes.icon} size={24} />
        <DatePicker
          showPopperArrow={false}
          id='date'
          selected={enteredDate}
          onChange={dateChangeHandler}
          dateFormat='yyyy-MM-dd'
          required
          locale={ko}
        />
      </div>

      {/* ---------시간 선택 부분-------- */}
      <div className={`${classes.time} schedule`}>
        <BsClock size={24} className={classes.icon} />
        <DatePicker
          showPopperArrow={false}
          id='time'
          showTimeSelect
          showTimeSelectOnly
          timeFormat='HH:mm'
          selected={enteredTime}
          onChange={timeChangeHandler}
          dateFormat='HH:mm'
          required
          locale={ko}
        />
      </div>

      {/* ---------내용 입력 부분-------- */}
      <div className={classes.mainContent}>
        <BsReverseLayoutTextSidebarReverse size={24} />
        <textarea
          className={classes.content}
          id='body'
          required
          rows={8}
          onChange={bodyChangeHandler}
          placeholder='내용을 입력하세요'
          value={enteredBody}
        />
      </div>
    </form>
  );
}

export default NewTask;
