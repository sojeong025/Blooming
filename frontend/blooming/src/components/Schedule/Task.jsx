import classes from './Task.module.css'

function formatDateToString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0, so we add 1 and pad with '0'
  const day = String(date.getDate()).padStart(2, '0'); // Pad the day with '0' if needed

  let hours = date.getHours();
  const ampm = hours >= 12 ? '오후' : '오전';
  hours %= 12;
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Pad the minutes with '0' if needed

  return `${year}-${month}-${day} ${ampm} ${hours}시`;
}

function Task ({ date, body }) {
  const formattedDate = formatDateToString(date);

  return (
    <li className={classes.post}>
      <p className={classes.body}>{body}</p>
      <p className={classes.date}>{formattedDate}</p>
    </li>
  );
}

export default Task;
