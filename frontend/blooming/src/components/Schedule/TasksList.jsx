import classes from './TasksList.module.css';
import Task from './Task';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ScheduleState, ScheduleTaskState, TodayTaskState } from '../../recoil/ScheduleStateAtom';
import { NavLink } from 'react-router-dom';

function TasksList() {
  const tasks = useRecoilValue(ScheduleTaskState);
  const selectedDate = useRecoilValue(ScheduleState)
  const setTodayTask = useSetRecoilState(TodayTaskState)

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };


  return (
    <>
      {tasks.length > 0 && (
        <ul className={ classes.posts } >
          {tasks.map((task) => {
            if (formatDate(selectedDate) === formatDate(task.scheduleDate)) {
              setTodayTask((prev) => prev+1)
              return (
                <NavLink to={`/schedule/${task.id}`} key={task.id}>
                  <Task task={task} />
                </NavLink>
              )
            }
          })}
        </ul>
      )}
    </>
  )
}

export default TasksList;