package com.ssafy.backend.domain.schedule.controller;

import com.google.api.Http;
import com.ssafy.backend.domain.common.BasicResponse;
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

import javax.persistence.Basic;
import java.util.Collections;
import java.util.List;

@Tag(name = "일정 API", description = "캘린터 일정 추가 API")
@RestController
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "일정 하나 등록하기", description = "캘린더에서 새로운 일정을 등록합니다.")
    @Parameter(name = "ScheduleRegistDto", description = "일정 이름, 내용, 날짜, 시간, 담당자(공통, 신랑, 신부), 카테고리(스드메, 웨딩홀..)를 넘겨주세요")
    @PostMapping("/schedule")
    public ResponseEntity<BasicResponse> registSchedule(@RequestBody ScheduleRegistDto scheduleRegistDto) {
        scheduleService.registSchedule(scheduleRegistDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("일정 등록 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "일정 전체 조회하기", description = "캘린더로 모든 일정을 불러옵니다.")
    @Parameter(name = "없음", description = "없음")
    @GetMapping("/schedule")
    public ResponseEntity<BasicResponse> getAllSchedule() {
        List<ScheduleResultDto> scheduleList = scheduleService.getAllSchedule();
        BasicResponse basicResponse;
        if (scheduleList == null) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("전체 일정 조회 실패")
                    .count(0).build();
        } else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("전체 일정 조회 성공")
                    .count(scheduleList.size())
                    .result(Collections.singletonList(scheduleList)).build();
        }
        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "일정 하나 조회하기", description = "상세 일정 하나를 불러옵니다.")
    @Parameter(name = "schedule.id", description = "상세 조회할 일정 아이디 하나를 넘겨주세요")
    @GetMapping("/schedule/{scheduleId}")
    public ResponseEntity<BasicResponse> getOneSchedule(@PathVariable Long scheduleId) {
        ScheduleResultDto scheduleResultDto = scheduleService.getOneSchedule(scheduleId);
        BasicResponse basicResponse;
        if (scheduleResultDto == null) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("전체 일정 조회 실패")
                    .count(0).build();
        } else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("전체 일정 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(scheduleResultDto)).build();
        }
        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "일정 하나 수정하기", description = "특정 일정을 수정합니다.")
    @Parameter(name = "ScheduleModifyDto", description = "변경 가능한 것 : title, content, scheduleTime")
    @PutMapping("/schedule")
    public ResponseEntity<BasicResponse> modifySchedule(@RequestBody ScheduleModifyDto scheduleModifyDto) {
        scheduleService.modifySchedule(scheduleModifyDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("일정 수정 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "일정 하나 삭제하기", description = "특정 일정을 삭제합니다.")
    @Parameter(name = "schedule.id", description = "삭제할 일정의 id를 넘겨주세요")
    @DeleteMapping("/schedule/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("일정 삭제 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
