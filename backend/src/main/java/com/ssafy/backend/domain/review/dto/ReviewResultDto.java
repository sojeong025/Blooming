package com.ssafy.backend.domain.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewResultDto {
    private Long reviewId;
    private int star;
    private String image;
    private String content;
}
