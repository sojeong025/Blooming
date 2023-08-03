import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRecoilState } from 'recoil';
import { weddingDateState } from '../../../recoil/WeddingDdayAtom';
import { ko } from "date-fns/esm/locale";

import classes from './Common.module.css';

function WeddingDay() {
  const [startDate, setStartDate] = useRecoilState(weddingDateState);

  return (
    <div className={classes.container}>
      <p className={classes.header}>예식일</p>
      <hr />
      <div>
        <label htmlFor="date">예식일</label><br />
        <DatePicker
          selected={startDate}
          locale={ko} 
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy-MM-dd hh:mm aa"
        />
      </div>
    </div>
  );
}

export default WeddingDay;