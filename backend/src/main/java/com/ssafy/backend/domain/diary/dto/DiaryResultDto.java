package com.ssafy.backend.domain.diary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DiaryResultDto {

    private Long id;
    private String title;
    private String content;
    private String date;
    private String image;

}
