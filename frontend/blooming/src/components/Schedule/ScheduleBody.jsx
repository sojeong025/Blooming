import { useRecoilValue } from 'recoil';
import { ScheduleState } from '../../recoil/ScheduleStateAtom';
import classes from './ScheduleBody.module.css'

function ScheduleBody({ onCreatePost }) {
  const selectedDate = useRecoilValue(ScheduleState);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric',
                      month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className={classes.contatiner}>
      <div className={classes.word}>
        <p className={classes.select}>{formatDate(selectedDate)}</p>
        <p className={classes.count}>오늘의 일정은 몇 개 입니다</p>
      </div>
      <div className={classes.btn}>
        {/* 이미지로 수정해야함 */}
        <button onClick={onCreatePost}> + </button>
      </div>
    </div>
  );
}

export default ScheduleBody;
