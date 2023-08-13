package com.ssafy.backend.domain.tipBox.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.tipBox.dto.TipBoxResultDto;
import com.ssafy.backend.domain.tipBox.service.TipBoxService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@Tag(name = "팁박스 API", description = "D Day 맞춤 팁을 랜덤으로 리턴")
@RestController
@RequiredArgsConstructor
public class TipBoxController {
    private final TipBoxService tipBoxService;
    @Operation(summary = "D day 맞춤 팁 리턴", description = "D day에맞는 알림을 리턴")
    @Parameter(name = "leftday", description = "체크리스트 d-day를 넘겨주세요")
    @GetMapping("/tipbox/{leftDay}")
    public ResponseEntity<BasicResponse> getAllSchedule(@PathVariable int leftDay) {
        TipBoxResultDto tipBoxResultDto = tipBoxService.getTipBox(leftDay);
        BasicResponse basicResponse;

        basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message(" 성공")
                .count(1)
                .result(Collections.singletonList(tipBoxResultDto)).build();

        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }
}
