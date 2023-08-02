package com.ssafy.backend.domain.diary.dto;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class DiaryRegistDto {

    private String title;
    private String content;
    private String diarydate;

    // 이미지 일단 string
    private String image;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;
}