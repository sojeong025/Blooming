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
    private int likeCnt;

    //상품 조회 추가
    private Long productId;
    private String productName;
}
