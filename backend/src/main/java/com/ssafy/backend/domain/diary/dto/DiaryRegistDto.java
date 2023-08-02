package com.ssafy.backend.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DiaryRegistDto {

    private String title;
    private String content;
    private String date;
    private String image;

}