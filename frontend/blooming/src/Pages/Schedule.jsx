import { useEffect, useState } from "react";
import CalendarComponent from "../components/Schedule/CalendarComponent"
import TasksList from "../components/Schedule/TasksList"
import ScheduleBody from "../components/Schedule/ScheduleBody"
import classes from './Schedule.module.css'
import { useRecoilState } from "recoil";
import { ScheduleTaskState } from "../recoil/ScheduleStateAtom";
import { customAxios } from "../lib/axios";

function Schedule() {
  const [task, setTask] = useRecoilState(ScheduleTaskState)
  const [ modalIsVisible, setModalIsVisible ] = useState(false);

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  function showModalHandler() {
    setModalIsVisible(true);
  }

  async function fetchTask() {
    try {
      const response = await customAxios.get('scehdule')
      console.log(response.data.result[0])
      setTask(response.data.result[0])
    } catch (error) {
      console.log("스케쥴 받기 API", error)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [])

  return (
    <div className={classes.mainContainer}>
      <CalendarComponent />
      <ScheduleBody onCreatePost={showModalHandler}/>
      <TasksList isPosting={modalIsVisible} onStopPosting={hideModalHandler}/>
    </div>
  )
}

export default Schedule;
