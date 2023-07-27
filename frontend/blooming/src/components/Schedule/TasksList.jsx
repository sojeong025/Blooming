import classes from './TasksList.module.css';
import NewTask from "./NewTask";
import Task from './Task';
import Modal from './Modal';
import { useState } from 'react';

function TasksList({isPosting, onStopPosting}) {
  const [tasks, setTasks ]= useState([]);

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
        {tasks.map((task) => <Task key={task.body} date={task.date} body={task.body} />)}
      </ul>
    )}
    {tasks.length === 0 && (
      <p>오늘은 일정이 없슴다</p>
    )}
    </>
  )
}

export default TasksList;