import classes from './TasksList.module.css';
import NewTask from "./NewTask";
import Task from './Task';
import Modal from './Modal';
import { useRecoilState } from 'recoil';
import { ScheduleState, ScheduleTaskState } from '../../recoil/ScheduleStateAtom';

function TasksList({isPosting, onStopPosting}) {
  const [tasks, setTasks ]= useRecoilState(ScheduleTaskState);
  const [selectedDate, setSelectedDate] = useRecoilState(ScheduleState)

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  function addTaskHandler(taskData) {
    setTasks((existingTasks) => [taskData, ...existingTasks]);
  }

  return (
    <>
    {isPosting && (
      <Modal onClose={onStopPosting}>
        <NewTask onCancel={onStopPosting} onAddTask={addTaskHandler} />
      </Modal>
    )}
    {tasks.length > 0 && (
      <ul className={ classes.posts } >
        {tasks.map((task) => {
          if (formatDate(selectedDate) === formatDate(task.scheduleDate)) {
            return (
              <Task key={task.id} date={task.scheduleDate} body={task.content} />
            )
          }
        })}
      </ul>
    )}
    </>
  )
}

export default TasksList;