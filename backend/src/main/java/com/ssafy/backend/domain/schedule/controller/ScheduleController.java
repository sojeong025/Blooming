package com.ssafy.backend.domain.schedule.controller;

import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "일정 API", description = "캘린터 일정 추가 API")
@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "일정 등록하기", description = "캘린더에서 새로운 일정을 등록합니다.")
    @Parameter(name = "scheduleDto", description = "일정 이름, 날짜, 시간, 카테고리 입력받음")
    @PostMapping("/schedule")
    public String registSchedule(@RequestBody Schedule schedule){
        scheduleService.registSchedule(schedule);
        return "일정 등록 성공";
    }

}
