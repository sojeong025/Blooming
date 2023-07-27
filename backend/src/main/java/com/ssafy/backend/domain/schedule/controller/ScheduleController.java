package com.ssafy.backend.domain.schedule.controller;

import com.ssafy.backend.domain.schedule.Schedule;
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
    @Parameter(name = "Schedule", description = "일정 이름, 날짜, 시간, 카테고리(공통, 신랑, 신부)를 넘겨주세요")
    @PostMapping("/schedule")
    public ResponseEntity<?> registSchedule(@RequestBody Schedule schedule){
        int cnt = scheduleService.registSchedule(schedule);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Operation(summary = "일정 전체 조회하기", description = "캘린더로 모든 일정을 불러옵니다.")
    @Parameter(name = "user.coupleId", description = "로그인한 회원의 커플 아이디를 넘겨주세요")
    @GetMapping("/schedule/{coupleId}")
    public ResponseEntity<?> getAllSchedule(@PathVariable Long coupleId){
        List<Schedule> scheduleList = scheduleService.getAllSchedule(coupleId);
        if (scheduleList == null){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<List<Schedule>>(scheduleList, HttpStatus.OK);
        }
    }

    @Operation(summary = "일정 하나 조회하기", description = "상세 일정 하나를 불러옵니다.")
    @Parameter(name = "schedule.id", description = "상세 조회할 일정 아이디 하나를 넘겨주세요")
    @GetMapping("/schedule/{scheduleId}")
    public ResponseEntity<?> getOneSchedule(@PathVariable Long scheduleId){
        Schedule schedule = scheduleService.getOneSchedule(scheduleId);
        if (schedule == null){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<Schedule>(schedule, HttpStatus.OK);
        }
    }

    @Operation(summary = "일정 하나 수정하기", description = "특정 일정을 수정합니다.")
    @Parameter(name = "Schedule", description = "변경 가능한 것 : title, scheduleDate, scheduleTime, scheduledBy(일정 이름, 날짜, 시간, 카테고리)")
    @PutMapping("/schedule")
    public ResponseEntity<?> modifySchedule(@RequestBody Schedule schedule){
        int cnt = scheduleService.modifySchedule(schedule);
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
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId){
        int cnt = scheduleService.deleteSchedule(scheduleId);
//        if (cnt == 0){
//            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//        }
//        else{
        return new ResponseEntity<Void>(HttpStatus.OK);
//        }
    }

}
