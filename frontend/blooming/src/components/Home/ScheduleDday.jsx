import dayjs from "dayjs";
import "dayjs/locale/ko";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useRecoilValue } from "recoil";
import { schedulesState } from "../../recoil/ScheduleDdayAtom";
import { useEffect, useState } from "react";
dayjs.locale("ko");

dayjs.extend(isSameOrAfter);

const ScheduleDday = () => {
  const schedules = useRecoilValue(schedulesState);

  const todayDate = dayjs().format("YYYY-MM-DD"); // 오늘 날짜만

  // 다가오는 가장 빠른 일정
  const [earliestUpcomingSchedule, setEarliestUpcomingSchedule] =
    useState(null);

  useEffect(() => {
    const findEarliestUpcomingSchedule = () => {
      const upcomingSchedules = schedules.filter((schedule) =>
        dayjs(schedule.date).isSameOrAfter(todayDate),
      );

      if (upcomingSchedules.length > 0) {
        const earliest = upcomingSchedules.reduce((prev, current) =>
          dayjs(prev.date).isBefore(dayjs(current.date)) ? prev : current,
        );
        setEarliestUpcomingSchedule(earliest);
      }
    };

    findEarliestUpcomingSchedule();
  }, [schedules, todayDate]);

  const calculateDday = (targetDate) => {
    const target = dayjs(targetDate);
    const diff = target.diff(todayDate, "day");
    // return Math.ceil(diff);
    return diff;
  };

  return (
    <>
      {earliestUpcomingSchedule ? (
        <>
          <h2>다음 일정</h2>
          <div>
            <p>{earliestUpcomingSchedule.title}</p>
            <span>{earliestUpcomingSchedule.date} | </span>
            <span>{earliestUpcomingSchedule.type} 일정 | </span>
            <span>D-{calculateDday(earliestUpcomingSchedule.date)}</span>
          </div>
        </>
      ) : (
        <h2>오늘 이후 일정이 없어용.</h2>
      )}
    </>
  );
};

export default ScheduleDday;
