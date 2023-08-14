import { useRecoilValue } from 'recoil';
import { ScheduleState, TodayTaskState } from '../../recoil/ScheduleStateAtom';
import classes from './ScheduleBody.module.css'
import { NavLink } from 'react-router-dom';

function ScheduleBody() {
  const selectedDate = useRecoilValue(ScheduleState);
  const todayTask = useRecoilValue(TodayTaskState)

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric',
                      month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={classes.contatiner}>
      <div className={classes.word}>
        <p className={classes.select}>{formatDate(selectedDate)}</p>
        <p className={classes.count}>오늘의 일정은 {todayTask} 개 입니다</p>
      </div>
      <div className={classes.btn}>
        <NavLink to="schedule/new-task">
          <button> + </button>
        </NavLink>
      </div>
    </div>
  );
}

export default ScheduleBody;
