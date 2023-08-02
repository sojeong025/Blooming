package com.ssafy.backend.domain.couple.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.couple.dto.WeddingDateDto;
import com.ssafy.backend.domain.couple.service.CoupleService;
import com.ssafy.backend.domain.user.User;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Collections;

@Tag(name = "커플 API", description = "커플 관련 API")
@RestController
@RequiredArgsConstructor
public class CoupleController {

    private final CoupleService coupleService;

    @Operation(summary = "결혼식 예정 날짜 등록", description = "회원가입 후 결혼식 날짜가 정해진 유저의 결혼식 예정 날짜를 받습니다.")
    @Parameter(name = "weddingDateDto", description = "결혼식 예정 날짜 dto")
    @PostMapping("/wedding-date")
    public ResponseEntity<BasicResponse> registerWeddingDate(@RequestBody WeddingDateDto weddingDateDto) throws Exception {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        LocalDate weddingDate = weddingDateDto.getWeddingDate();
        coupleService.registerWeddingDate(weddingDate, authentication.getName());

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("결혼식 예정 날짜 등록 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "결혼식 예정 날짜 조회", description = "커플의 결혼식 예정 날짜를 조회합니다.")
    @GetMapping("/wedding-date")
    public ResponseEntity<BasicResponse> getWeddingDate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        LocalDate weddingDate = coupleService.getWeddingDate(authentication.getName());
        WeddingDateDto weddingDateDto = new WeddingDateDto(weddingDate);

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("결혼식 예정 날짜 조회 성공")
            .result(Collections.singletonList(weddingDateDto))
            .count(1).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
