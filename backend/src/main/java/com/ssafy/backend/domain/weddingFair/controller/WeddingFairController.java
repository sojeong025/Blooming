package com.ssafy.backend.domain.weddingFair.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.weddingFair.dto.WeddingFairResultDto;
import com.ssafy.backend.domain.weddingFair.service.WeddingFairService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@Tag(name = "웨딩 박람회 정보 제공 API")
@RestController
@RequiredArgsConstructor
public class WeddingFairController {

    private final WeddingFairService weddingFairService;

    @GetMapping("/wedding-fair")
    public ResponseEntity<BasicResponse> getWeddingFair(){
        List<WeddingFairResultDto> weddingFairResultDtoList = weddingFairService.getWeddingFair();

        BasicResponse basicResponse;
        if (weddingFairResultDtoList.size() == 0) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("박람회 정보가 없습니다.")
                    .build();
        } else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("박람회 조회 성공")
                    .count(weddingFairResultDtoList.size())
                    .result(Collections.singletonList(weddingFairResultDtoList)).build();
        }
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());

    }
}
