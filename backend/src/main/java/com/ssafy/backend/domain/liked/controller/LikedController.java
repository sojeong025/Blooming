package com.ssafy.backend.domain.liked.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.liked.service.LikedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Tag(name = "상품 후기 도움 돼요(좋아요) API", description = "상품 후기 도움 돼요(좋아요) 등록 취소 조회 API")
@RestController
@RequiredArgsConstructor
public class LikedController {
    // 등록, 삭제, 몇개인지 출력 까지
    private final LikedService likedService;


    @Operation(summary = "상품 후기 도움 돼요 등록하기", description = "상품 후기 도움돼요 등록")
    @Parameter(name = "reviewId", description = "상품 후기 ID 를 넘겨주세요")
    @PostMapping("/liked/{reviewId}")
    public ResponseEntity<BasicResponse> registLiked(@PathVariable Long reviewId) {
        likedService.registLiked(reviewId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("다이어리 등록 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "상품 후기 도움 돼요 취소하기", description = "상품 후기 도움돼요 취소")
    @Parameter(name = "reviewId", description = "상품 후기 ID 를 넘겨주세요")
    @DeleteMapping("/liked/{reviewId}")
    public ResponseEntity<BasicResponse> deleteDiary(@PathVariable Long reviewId) {
        likedService.deleteLiked(reviewId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("다이어리 삭제 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


    @Operation(summary = "상품 후기 도움 돼요 개수 출력", description = "해당 상품 후기의 도움 돼요 개수를 리턴합니다")
    @Parameter(name = "reviewId", description = "상품 후기 ID 를 넘겨주세요")
    @GetMapping("/liked/{reviewId}")
    public ResponseEntity<BasicResponse> getLikdedCount(@PathVariable Long reviewId) {
        Long count = likedService.getLikedCount(reviewId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("다이어리 삭제 성공")
                .count(1)
                .result(Collections.singletonList(count)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
