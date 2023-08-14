import { useNavigate, useParams } from 'react-router-dom';
import classes from './TaskDetail.module.css';
import { useEffect, useState } from 'react';
import { customAxios } from '../../lib/axios';

function TaskDetail() {

  const { id } = useParams();
  const [task, setTask] = useState();

  const navigate = useNavigate();
  const handleHistory = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`schedule/${id}`);
        
        if (response.status === 200) {
          setTask(response.data.result[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {task &&
        <div className={classes.details}>
          <div className={classes.date}>{task.scheduleDate} {task.scheduleTime}</div>
          <div className={classes.text}>{task.title}</div>
          <div className={classes.text}>{task.content}</div>
          <button onClick={handleHistory}>뒤로가기</button>
          <button>수정하기</button>
        </div>
      }
    </>
  );
}

export default TaskDetail;