package com.ssafy.backend.domain.diary.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DiaryRegistDto {

    private String title;
    private String content;
    private LocalDate date;
    private String image;

}