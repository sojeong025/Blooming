package com.ssafy.backend.domain.review.dto;

import com.ssafy.backend.domain.review.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ReviewResultDto {
    private Long reviewId;
    private int star;
    private String image;
    private String content;
    private int likeCnt;

    // 글쓴이 추가
    private String nickName;
    private String email;
    private boolean isLiked;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime updatedDate;

    public ReviewResultDto(Review review, boolean isLiked) {
        this.reviewId = review.getId();
        this.star = review.getStar();
        this.image = review.getImage();
        this.content = review.getContent();
        this.likeCnt = review.getLikeCnt();
        this.nickName = review.getUser().getNickname();
        this.email = review.getUser().getEmail();
        this.isLiked = isLiked;
        this.createdDate = review.getCreatedDate();
        this.updatedDate = review.getUpdatedDate();
    }
}
