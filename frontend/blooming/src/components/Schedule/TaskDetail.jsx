import { useLoaderData, Link } from 'react-router-dom';

import Modal from '../components/Modal';
import classes from './TaskDetail.module.css';

function TaskDetail() {
  const task = useLoaderData();

  if (!task) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find task</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.date}>{task.date}</p>
        <p className={classes.text}>{task.body}</p>
      </main>
    </Modal>
  );
}

export default TaskDetail;