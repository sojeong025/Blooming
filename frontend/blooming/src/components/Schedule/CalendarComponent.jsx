import { useRecoilState } from 'recoil'
import { ScheduleState } from '../../recoil/ScheduleStateAtom';
import Calendar from 'react-calendar';
import './CalendarComponent.css';

function CalendarHeader({ date }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return (
    <div className="calendar-header">
      <strong>{year}.{month}</strong>
    </div>
  );
}

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useRecoilState(ScheduleState);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      if (date.getDay() === 0 || date.getDay() === 6) {
        return 'weekend-day';
      }
    }
    return '';
  };

  const formatShortWeekday = (locale, date) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return weekdays[date.getDay()];
  };

  const formatDay = (locale, date) => {
    return date.getDate().toString();
  };

  return (
    <>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        tileClassName={tileClassName}
        formatShortWeekday={formatShortWeekday}
        formatDay={formatDay}
        renderHeader={({ date }) => <CalendarHeader date={date} />}
      />
      <p>{formatDate(selectedDate)}</p>
    </>
  );
}

export default CalendarComponent;
