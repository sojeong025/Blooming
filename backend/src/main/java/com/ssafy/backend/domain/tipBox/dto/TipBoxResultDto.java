package com.ssafy.backend.domain.tipBox.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class TipBoxResultDto {
    private int leftDay;
    private String title;
    private List<String> content;
    private String image;

}
