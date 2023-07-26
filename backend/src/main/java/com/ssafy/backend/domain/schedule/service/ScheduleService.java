package com.ssafy.backend.domain.schedule.service;

import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public void registSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
    }
}
