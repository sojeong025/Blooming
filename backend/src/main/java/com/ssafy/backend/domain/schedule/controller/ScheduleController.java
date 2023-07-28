package com.ssafy.backend.domain.schedule.controller;

import com.ssafy.backend.domain.schedule.dto.ScheduleModifyDto;
import com.ssafy.backend.domain.schedule.dto.ScheduleRegistDto;
import com.ssafy.backend.domain.schedule.dto.ScheduleResultDto;
import com.ssafy.backend.domain.schedule.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "일정 API", description = "캘린터 일정 추가 API")
@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "일정 하나 등록하기", description = "캘린더에서 새로운 일정을 등록합니다.")
    @Parameter(name = "ScheduleRegistDto", description = "일정 이름, 내용, 날짜, 시간, 담당자(공통, 신랑, 신부), 카테고리(스드메, 웨딩홀..)를 넘겨주세요")
    @PostMapping("/schedule")
    public ResponseEntity<?> registSchedule(@RequestBody ScheduleRegistDto scheduleRegistDto) {
        int cnt = scheduleService.registSchedule(scheduleRegistDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Operation(summary = "일정 전체 조회하기", description = "캘린더로 모든 일정을 불러옵니다.")
    @Parameter(name = "없음", description = "없음")
    @GetMapping("/schedule")
    public ResponseEntity<?> getAllSchedule() {
        List<ScheduleResultDto> scheduleList = scheduleService.getAllSchedule();
        if (scheduleList == null) {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<List<ScheduleResultDto>>(scheduleList, HttpStatus.OK);
        }
    }

    @Operation(summary = "일정 하나 조회하기", description = "상세 일정 하나를 불러옵니다.")
    @Parameter(name = "schedule.id", description = "상세 조회할 일정 아이디 하나를 넘겨주세요")
    @GetMapping("/schedule/{scheduleId}")
    public ResponseEntity<?> getOneSchedule(@PathVariable Long scheduleId) {
        ScheduleResultDto scheduleResultDto = scheduleService.getOneSchedule(scheduleId);
        if (scheduleResultDto == null) {
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<ScheduleResultDto>(scheduleResultDto, HttpStatus.OK);
        }
    }

    @Operation(summary = "일정 하나 수정하기", description = "특정 일정을 수정합니다.")
    @Parameter(name = "ScheduleModifyDto", description = "변경 가능한 것 : title, content, scheduleTime")
    @PutMapping("/schedule")
    public ResponseEntity<?> modifySchedule(@RequestBody ScheduleModifyDto scheduleModifyDto) {
        int cnt = scheduleService.modifySchedule(scheduleModifyDto);
//        if (cnt == 0){
//            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//        }
//        else{
        return new ResponseEntity<Void>(HttpStatus.OK);
//        }
    }

    @Operation(summary = "일정 하나 삭제하기", description = "특정 일정을 삭제합니다.")
    @Parameter(name = "schedule.id", description = "삭제할 일정의 id를 넘겨주세요")
    @DeleteMapping("/schedule/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId) {
        int cnt = scheduleService.deleteSchedule(scheduleId);
//        if (cnt == 0){
//            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//        }
//        else{
        return new ResponseEntity<Void>(HttpStatus.OK);
//        }
    }

}
