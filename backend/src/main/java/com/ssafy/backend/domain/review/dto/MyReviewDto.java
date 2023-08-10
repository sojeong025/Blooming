package com.ssafy.backend.domain.review.dto;

import com.ssafy.backend.domain.review.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MyReviewDto {
    private Long reviewId;
    private int star;
    private String image;
    private String content;
    private int likeCnt;

    private Long productId;
    private String productName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime updatedDate;

    public MyReviewDto(Review review) {
        this.reviewId = review.getId();
        this.star = review.getStar();
        this.image = review.getImage();
        this.content = review.getContent();
        this.likeCnt = review.getLikeCnt();
        this.productId = review.getProduct().getId();
        this.productName = review.getProduct().getItemName();
        this.createdDate = review.getCreatedDate();
        this.updatedDate = review.getUpdatedDate();
    }
}
