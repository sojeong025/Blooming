import DatePicker from 'react-datepicker';
import { useRecoilState } from 'recoil';
import { mobileInvitationState } from '../../../recoil/MobileInvitationAtom';
import { ko } from "date-fns/esm/locale";

import classes from './Common.module.css';

function WeddingDay() {
  const [invitation, setInvitation] = useRecoilState(mobileInvitationState);
  const startDate = invitation.weddingDate.date;

  const handleDateChange = (date) => {

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    setInvitation((preInvitation) => ({
      ...preInvitation,
      weddingDate: {
        ...preInvitation.weddingDate,
        date,
        time: {
        ...preInvitation.weddingDate.time,
        hour: hours,
        minute: minutes,
        second: seconds,
      },
      },
    }));
  };

  return (
    <div className={classes.container}>
      <p className={classes.header}>예식일</p>
      <hr />
      <div>
        <label htmlFor="date">예식일</label><br />
        <DatePicker
          selected={startDate}
          locale={ko} 
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </div>
    </div>
  );
}

export default WeddingDay;