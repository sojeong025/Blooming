package com.ssafy.backend.domain.review.dto;

import lombok.Getter;

@Getter
public class ReviewModifyDto {
    private int star;
    private String image;
    private String content;
}
