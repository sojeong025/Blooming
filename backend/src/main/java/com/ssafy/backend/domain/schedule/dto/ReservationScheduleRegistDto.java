package com.ssafy.backend.domain.schedule.dto;

import com.ssafy.backend.domain.schedule.ScheduleType;
import com.ssafy.backend.domain.schedule.ScheduledBy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class ReservationScheduleRegistDto {
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate scheduleDate;
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime scheduleTime;
    private ScheduledBy scheduledBy; //공통 or 개별(등록자 본인의 role)
    private ScheduleType scheduleType;

    private Long reservationId;
}
