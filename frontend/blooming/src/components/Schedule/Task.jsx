import classes from './Task.module.css'

function Task ({ task }) {

  return (
    <li className={classes.post}>
      <p className={classes.body}>{task.title}</p>
      <p className={classes.date}>{task.scheduleDate}</p>
    </li>
  );
}

export default Task;
