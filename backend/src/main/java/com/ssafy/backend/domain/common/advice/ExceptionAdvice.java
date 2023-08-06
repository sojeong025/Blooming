package com.ssafy.backend.domain.common.advice;

import com.ssafy.backend.domain.common.BasicResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<BasicResponse> ExceptionHandler(Exception e) {
        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.BAD_REQUEST.value())
            .httpStatus(HttpStatus.BAD_REQUEST)
            .message(e.getMessage()).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<BasicResponse> ExceptionHandler(IllegalArgumentException e) {
        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.BAD_REQUEST.value())
            .httpStatus(HttpStatus.BAD_REQUEST)
            .message(e.getMessage()).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @ExceptionHandler(value = IOException.class)
    public ResponseEntity<BasicResponse> ExceptionHandler(IOException e) {
        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .httpStatus(HttpStatus.BAD_REQUEST)
                .message(e.getMessage()).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
