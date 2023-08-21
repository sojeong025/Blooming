package com.ssafy.backend.domain.schedule.repository;


import com.ssafy.backend.domain.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findAllByScheduleDate(LocalDate scheduleDate);

    List<Schedule> findAllByCoupleId(Long coupleId);

    Optional<Schedule> findByReservationId(Long reservationId);


}
