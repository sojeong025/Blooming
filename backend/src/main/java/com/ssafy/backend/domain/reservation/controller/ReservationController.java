package com.ssafy.backend.domain.reservation.controller;

import com.google.api.Http;
import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.reservation.dto.ReservationRegistDto;
import com.ssafy.backend.domain.reservation.dto.ReservationResultDto;
import com.ssafy.backend.domain.reservation.repository.ReservationRepository;
import com.ssafy.backend.domain.reservation.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "예약 API", description = "예약 추가 API")
@RestController
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    //예약은 C, R, D

    @Operation(summary = "상품 예약하기", description = "상품 상세보기에서 예약 가능")
    @Parameter(name = "ReservationRegistDto", description = "예약 등록")
    @PostMapping("/reservation")
    public ResponseEntity<BasicResponse> registerReservation(@RequestBody ReservationRegistDto reservationRegistDto){
        reservationService.registerReservation(reservationRegistDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("예약 성공")
                .build();
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "로그인한 회원의 상품 예약 가져오기", description = "로그인한 회원의 예약 내역 불러오기")
    @GetMapping("/reservation")
    public ResponseEntity<BasicResponse> getUserReservation(){
        List<ReservationResultDto> reservationResultDtos = reservationService.getUserReservation();

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("예약 가져오기 성공")
                .count(reservationResultDtos.size())
                .result(Collections.singletonList(reservationResultDtos))
                .build();
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "예약 취소하기", description = "예약 리스트에서 취소 가능")
    @Parameter(name = "reservationId", description = "취소할 예약 ID")
    @DeleteMapping("/reservation/{reservationId}")
    public ResponseEntity<BasicResponse> deleteReservation(@PathVariable Long reservationId){
        reservationService.deleteReservation(reservationId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("예약 취소 성공")
                .build();
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
