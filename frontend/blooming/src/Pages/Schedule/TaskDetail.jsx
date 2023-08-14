import { useNavigate, useParams } from 'react-router-dom';
import classes from './TaskDetail.module.css';
import { useEffect, useState } from 'react';
import { customAxios } from '../../lib/axios';

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

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

  const startEditing = () => {
    setEditedTask(task);
    setEditing(true);
  };

  const finishEditing = async () => {
    const taskData = {
      id: task.id,
      title: editedTask.title,
      content: editedTask.content,
      scheduleDate: task.scheduleDate,
      scheduleTime: task.scheduleTime
    };
    try {
      const response = await customAxios.put("schedule", taskData);

      if (response.status === 200) {
        setTask(response.data.result[0]);
      }
    } catch (error) {
      console.error(error);
    }
    
    setEditing(false);
  };

  const cancelEditing = () => {
    setEditing(false);
  };

  const inputChangeHandler = (event, field) => {
    setEditedTask({ ...editedTask, [field]: event.target.value });
  };

  return (
    <>
      {task && (
        <div style={{ marginTop: '56px' }} className={classes.details}>
          <div className={classes.date}>{task.scheduleDate} {task.scheduleTime}</div>
          {editing ? (
            <input
              type="text"
              value={editedTask.title}
              onChange={(event) => inputChangeHandler(event, 'title')}
            />
          ) : (
            <div className={classes.text}>{task.title}</div>
          )}
          {editing ? (
            <input
              type="text"
              value={editedTask.content}
              onChange={(event) => inputChangeHandler(event, 'content')}
            />
          ) : (
            <div className={classes.text}>{task.content}</div>
          )}
          <button onClick={handleHistory}>뒤로가기</button>
          {editing ? (
            <button onClick={finishEditing}>완료</button>
          ) : (
            <button onClick={startEditing}>수정하기</button>
          )}
          {editing && <button onClick={cancelEditing}>취소</button>}
        </div>
      )}
    </>
  );
}

export default TaskDetail;
