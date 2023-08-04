package com.ssafy.backend.domain.review.dto;

import lombok.Getter;

@Getter
public class ReviewRegistDto {
    private Long product_id;
    private int star;
    private String image;
    private String content;
}
