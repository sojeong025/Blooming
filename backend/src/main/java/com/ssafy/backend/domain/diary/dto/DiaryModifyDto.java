package com.ssafy.backend.domain.diary.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class DiaryModifyDto {

    private Long id;
    private String title;
    private String content;
    private LocalDate date;
    private String image;

}
