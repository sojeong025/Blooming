import classes from './Task.module.css'

function Task ({ date, body }) {

  return (
    <li className={classes.post}>
      <p className={classes.body}>{body}</p>
      <p className={classes.date}>{date}</p>
    </li>
  );
}

export default Task;
