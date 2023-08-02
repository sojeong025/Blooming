import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useRecoilState } from 'recoil';
import { weddingDateState } from '../../../recoil/WeddingDdayAtom';

import classes from './Common.module.css';

function WeddingDay() {
  const [startDate, setStartDate] = useRecoilState(weddingDateState);

  return (
    <div className={classes.container}>
      예식일
      <hr />
      <div>
        <label htmlFor="date">예식일</label><br />
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    </div>
  );
}

export default WeddingDay;