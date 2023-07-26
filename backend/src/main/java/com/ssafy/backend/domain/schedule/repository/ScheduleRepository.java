package com.ssafy.backend.domain.schedule.repository;


import com.ssafy.backend.domain.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByScheduleDate(LocalDate scheduleDate);

}
