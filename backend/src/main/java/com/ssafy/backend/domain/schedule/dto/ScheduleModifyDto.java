package com.ssafy.backend.domain.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
public class ScheduleModifyDto {
    private Long id;
    private String title;
    private String content;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate scheduleDate;
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime scheduleTime;
//    private ScheduledBy scheduledBy; //공통 or 개별(등록자 본인의 role)
//    private Category category; //카테고리가 바뀔 일은 없나?
}
