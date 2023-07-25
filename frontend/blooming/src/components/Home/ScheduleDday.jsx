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

  const todayDate = dayjs(); // 오늘 날짜

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
    return Math.ceil(diff);
  };

  const today = dayjs().format("YYYY-MM-DD");
  const tmp = dayjs("2023-07-25").diff(today, "day");

  return (
    <>
      <div>임시 디데이는 뜨는뎅 포맷을 다 바꿔야하낭? {tmp}</div>
      <div>
        {earliestUpcomingSchedule ? (
          <>
            <h2>오늘 이후 일정 중 가장 빨리 시작하는 일정의 D-Day</h2>
            <div>
              <p>{earliestUpcomingSchedule.title}</p>
              <p>날짜: {earliestUpcomingSchedule.date}</p>
              <p>유형: {earliestUpcomingSchedule.type}</p>
              <p>D-{calculateDday(earliestUpcomingSchedule.date)}</p>
              {/* 내일인데 왜 D-0임?>>?? */}
            </div>
          </>
        ) : (
          <h2>오늘 이후 일정이 없습니다.</h2>
        )}
      </div>
    </>
  );
};

export default ScheduleDday;
