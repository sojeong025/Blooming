import classes from './Task.module.css'

function Task({ task, iconSrc, scheduledBy }) {
  const formattedTime = task.scheduleTime.slice(0, 5);

  return (
    <div className={classes.post}>
      <div className={`${classes.left} ${classes[scheduledBy]}`}>
        <div className={classes.body}>{task.title}</div>
        <div className={classes.dateWrapper}>
          <span className={classes.dateText}>시간 &nbsp; </span>
          <span className={classes.date}>{formattedTime}</span>
        </div>
      </div>
      <div className={classes.right}>
        <img src={iconSrc} style={{ width: "50px", height: "50px" }} alt="Icon" />
      </div>
    </div>
  );
}

export default Task;