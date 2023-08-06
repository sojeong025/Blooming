package com.ssafy.backend.global.s3.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.common.FileUploadResponse;
import com.ssafy.backend.global.s3.service.S3Uploader;
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

@Tag(name = "회원 API", description = "카카오톡 로그인 회원 API")
@RestController
@RequiredArgsConstructor
public class S3UploaderController {

    private final S3Uploader s3Uploader;

    @PostMapping("/s3/{filePath}")
    public ResponseEntity<BasicResponse> uploadImage(@PathVariable String filePath, @RequestParam("image") MultipartFile multipartFile) throws IOException {
        FileUploadResponse fileUploadResponse = s3Uploader.uploadFiles(multipartFile, filePath);

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
