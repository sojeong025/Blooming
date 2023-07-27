package com.ssafy.backend.domain.schedule.dto;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.schedule.ScheduledBy;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
public class ScheduleRegistDto {
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate scheduleDate;
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime scheduleTime;
    private ScheduledBy scheduledBy; //공통 or 개별(등록자 본인의 role)
}
