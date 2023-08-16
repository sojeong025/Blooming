import { useNavigate, useParams } from 'react-router-dom';
import classes from './TaskDetail.module.css';
import { useEffect, useState } from 'react';
import { customAxios } from '../../lib/axios';
import { AiOutlineLeft } from "react-icons/ai"
import { PiPencilLineFill } from 'react-icons/pi'
import { BsTrash , BsCalendarCheck, BsClock, BsReverseLayoutTextSidebarReverse } from 'react-icons/bs'

function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState();
  const [formattedTime, setFormattedTime] = useState();

  const navigate = useNavigate();

  const taskTypeClassName = () => {
    switch (task.scheduledBy) {
      case "FEMALE":
        return classes.mainTitleFemale;
      case "MALE":
        return classes.mainTitleMale;
      case "COMMON":
        return classes.mainTitleCommon;
      default:
        return "";
    }
  };

  const handleHistory = () => {
    navigate("/schedule");
  };

  const handleUpdate = () => {
    navigate(`/schedule/new-task`, {
      state: { task: task },
    });
  }

  async function deleteHandler() {
    if (task) {
      try {
        await customAxios.delete(`schedule/${task.id}`);
        navigate('/schedule');
      } catch (error) {
        console.log('스케쥴 삭제 API 에러', error);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxios.get(`schedule/${id}`);
        
        if (response.status === 200) {
          setTask(response.data.result[0]);
          setFormattedTime(response.data.result[0].scheduleTime.slice(0, 5));
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

          {/* ---------버튼 부분-------- */}   
          <div className={classes.actions}>
            <div className={classes.back}>
              <button onClick={handleHistory}><AiOutlineLeft /></button>
            </div>
            <div className={classes.editdel}>
              <button onClick={handleUpdate}><PiPencilLineFill/></button>
              <button onClick={deleteHandler}><BsTrash /></button>
            </div>
          </div>


          {/* ---------제목 입력 부분-------- */}
          <div className={`${classes.mainTitle} ${taskTypeClassName()}`}>
            <div className={classes.title}>{task.title}</div>
          </div>


            {/* ---------날짜 선택 부분-------- */}
          <div className={`${classes.date} schedule`}>
            <BsCalendarCheck className={classes.icon} size={24}/>
            <div className={classes.date1}>{task.scheduleDate}</div>
          </div>

            {/* ---------시간 선택 부분-------- */}
          <div className={`${classes.time} schedule`}>
            <BsClock size={24} className={classes.icon}/>
            <div className={classes.time1}>{formattedTime}</div>
          </div>

          {/* ---------내용 입력 부분-------- */}
          <div className={classes.mainContent}>
            <BsReverseLayoutTextSidebarReverse size={24} />
            <div className={classes.content}>{task.content}</div>
          </div>
        </div>
        
      }
    </>
  );
}

export default TaskDetail;