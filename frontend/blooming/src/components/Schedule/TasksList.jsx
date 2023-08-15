import classes from './TasksList.module.css';
import Task from './Task';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { ScheduleState, ScheduleTaskState, TodayTaskState } from '../../recoil/ScheduleStateAtom';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import femaleIcon from '/src/assets/Icon/female.png'
import maleIcon from '/src/assets/Icon/male.png'
import commonIcon from '/src/assets/Icon/common.png'


function TasksList() {
  const tasks = useRecoilValue(ScheduleTaskState);

  const selectedDate = useRecoilValue(ScheduleState)
  const setTodayTask = useSetRecoilState(TodayTaskState)

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    let count = 0;

    tasks.forEach((task) => {
      if (formatDate(selectedDate) === formatDate(task.scheduleDate)) {
        count += 1;
      }
    });

    setTodayTask(count);
  }, [tasks, selectedDate, setTodayTask]);

  return (
    <>
      {tasks.length > 0 && (
        <ul className={ classes.posts } >
          {tasks.map((task) => {
            let iconSrc;

            switch (task.scheduledBy) {
              case 'FEMALE':
                iconSrc = femaleIcon;
                break;
              case 'MALE':
                iconSrc = maleIcon;
                break;
              default:
                iconSrc = commonIcon;
            }


            if (formatDate(selectedDate) === formatDate(task.scheduleDate)) {
              return (
                <NavLink to={`/schedule/${task.id}`} key={task.id}>
                  <Task task={task}  iconSrc={iconSrc} scheduledBy={task.scheduledBy}/>
                </NavLink>
              )
            }
            return null;
          })}
        </ul>
      )}
    </>
  )
}

export default TasksList;