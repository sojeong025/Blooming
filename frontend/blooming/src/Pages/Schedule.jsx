import { useState } from "react";
import CalendarComponent from "../components/Schedule/CalendarComponent"
import TasksList from "../components/Schedule/TasksList"
import ScheduleBody from "../components/Schedule/ScheduleBody"
import classes from './Schedule.module.css'


function Schedule() {
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showModalHandler() {
    setModalIsVisible(true);
  }

  return (
    <div className={classes.mainContainer}>
      <CalendarComponent /><hr />
      <ScheduleBody onCreatePost={showModalHandler}/><hr />
      <TasksList isPosting={modalIsVisible} onStopPosting={hideModalHandler}/>
    </div>
  )
}

export default Schedule;
