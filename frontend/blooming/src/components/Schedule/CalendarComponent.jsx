import { useRecoilState } from 'recoil'
import { ScheduleState } from '../../recoil/ScheduleStateAtom';
import Calendar from 'react-calendar';
import './CalendarComponent.css';

function CalendarHeader({ date, onViewChange }) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const handlePrev = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    onViewChange({ activeStartDate: prevMonth, view: 'month' });
  };

  const handleNext = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    onViewChange({ activeStartDate: nextMonth, view: 'month' });
  };

  return (
    <div className="calendar-header">
      <button onClick={handlePrev}>Prev</button>
      <strong>
        <select
          value={month}
          onChange={(e) => {
            const updatedMonth = new Date(date);
            updatedMonth.setMonth(parseInt(e.target.value) - 1);
            onViewChange({ activeStartDate: updatedMonth, view: 'month' });
          }}>
          {[...Array(12).keys()].map((index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>.
        <select
          value={year}
          onChange={(e) => {
            const updatedYear = new Date(date);
            updatedYear.setFullYear(parseInt(e.target.value));
            onViewChange({ activeStartDate: updatedYear, view: 'month' });
          }}>
          {[...Array(201).keys()]
            .map((index) => 1900 + index)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </strong>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

function CalendarComponent() {
  const [selectedDate, setSelectedDate] = useRecoilState(ScheduleState);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric',
                      month: 'long', day: 'numeric' };
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
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        tileClassName={tileClassName}
        formatShortWeekday={formatShortWeekday}
        formatDay={formatDay}
        renderHeader={({ date, ...props }) => (
          <CalendarHeader date={date} {...props} />
        )}
      />
      <p>{formatDate(selectedDate)}</p>
    </div>
  );
}

export default CalendarComponent;

