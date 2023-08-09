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
public class ReservationScheduleResultDto {
    private Long scheduleId;
}
