package com.ssafy.backend.domain.schedule.service;

import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public int registSchedule(Schedule schedule) {
        scheduleRepository.save(schedule);
        return 1;
    }

    public List<Schedule> getAllSchedule(Long coupleId) {
        return scheduleRepository.findAllByCoupleId(coupleId);
    }

    public int modifySchedule(Schedule schedule) {
        //jpa.. 이용해서 해당 스케줄 아이디로 스케줄 객체 찾아서 set으로 변경? -- 이게맞나
        Schedule originalSchedule = getOneSchedule(schedule.getId());

        //맞나
        originalSchedule.update(schedule);
        return 1; //일단
    }

    public int deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
        return 1; //일단
    }

    public Schedule getOneSchedule(Long scheduleId) {
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("일정 아이디에 해당하는 일정이 없습니다."));
    }
}
