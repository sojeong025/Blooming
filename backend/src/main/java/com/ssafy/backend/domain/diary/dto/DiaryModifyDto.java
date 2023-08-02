package com.ssafy.backend.domain.diary.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DiaryModifyDto {

    private Long id;
    private String title;
    private String content;
    private String date;
    private String image;

}
