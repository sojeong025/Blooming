package com.ssafy.backend.global.s3.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.common.FileUploadResponse;
import com.ssafy.backend.global.s3.DomainType;
import com.ssafy.backend.global.s3.service.S3Uploader;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Tag(name = "S3 API", description = "S3 API")
@RestController
@RequiredArgsConstructor
public class S3UploaderController {

    private final S3Uploader s3Uploader;

    @Operation(summary = "이미지 업로드 API", description = "이미지 파일 전송 시 S3 업로드 후 이미지 url을 반환합니다.")
    @Parameter(name = "multipartFile", description = "첨부할 사진(multipart/form-data)")
    @PostMapping("/s3/{domainType}")
    public ResponseEntity<BasicResponse> uploadImage(@PathVariable DomainType domainType, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        FileUploadResponse fileUploadResponse = s3Uploader.uploadFiles(multipartFile, domainType);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("S3에 사진 업로드 성공")
                .count(1)
                .result(Collections.singletonList(fileUploadResponse))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
