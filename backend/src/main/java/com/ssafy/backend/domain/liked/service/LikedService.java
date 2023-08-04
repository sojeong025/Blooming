package com.ssafy.backend.domain.liked.service;

import com.ssafy.backend.domain.liked.Liked;
import com.ssafy.backend.domain.liked.repository.LikedRepository;
import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.review.repository.ReviewRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikedService {

    private final LikedRepository likedRepository;
    private final UserRepository userRepository;
    private  final ReviewRepository reviewRepository;

    public void registLiked(Long reviewId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("REVIEW: reviewId에 해당하는 리뷰를 찾을 수 없습니다."));
        Liked liked = new Liked(user, review);

        likedRepository.save(liked);
    }

    public void deleteLiked(Long reviewId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        likedRepository.deleteByUserIdAndReviewId(user.getId(), reviewId);
    }

    public Long getLikedCount(Long reviewId){
        return likedRepository.countByReviewId(reviewId);
    }



}
