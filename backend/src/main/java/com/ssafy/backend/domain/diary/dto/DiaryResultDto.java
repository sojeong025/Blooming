package com.ssafy.backend.domain.diary.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DiaryResultDto {

    private Long id;
    private String title;
    private String content;
    private LocalDate date;
    private String image;

}
