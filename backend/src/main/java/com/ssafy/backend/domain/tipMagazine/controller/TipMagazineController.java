package com.ssafy.backend.domain.tipMagazine.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.tipMagazine.TipMagazine;
import com.ssafy.backend.domain.tipMagazine.dto.TipMagazineDetailDto;
import com.ssafy.backend.domain.tipMagazine.dto.TipMagazineListDto;
import com.ssafy.backend.domain.tipMagazine.service.TipMagazineService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Basic;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Tag(name = "팁 매거진 API")
@RestController
@RequiredArgsConstructor
public class TipMagazineController {

    private final TipMagazineService tipMagazineService;

    @GetMapping("/tip-magazine")
    public ResponseEntity<BasicResponse> getMagazineList(){
        List<TipMagazineListDto> tipMagazineListDtoList = tipMagazineService.getMagazineList();

        BasicResponse basicResponse;
        basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("전체 팁 매거진 리스트 조회 성공")
                .count(tipMagazineListDtoList.size())
                .result(Collections.singletonList(tipMagazineListDtoList)).build();

        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }

    @GetMapping("/tip-magazine/{tipMagazineId}")
    public ResponseEntity<BasicResponse> getMagazineDetail(@PathVariable Long tipMagazineId){
        TipMagazine tipMagazine = tipMagazineService.getMagazineDetail(tipMagazineId);

        BasicResponse basicResponse;
        if (tipMagazine == null){
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("해당 매거진 정보 없음")
                    .count(0)
                    .build();
        }
        else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("해당 매거진 정보 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(tipMagazine)).build();
        }


        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }
}
