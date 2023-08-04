package com.ssafy.backend.domain.review.service;

import com.ssafy.backend.domain.review.dto.ReviewModifyDto;
import com.ssafy.backend.domain.review.dto.ReviewResultDto;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.review.dto.ReviewRegistDto;
import com.ssafy.backend.domain.review.repository.ReviewRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void registReview(ReviewRegistDto reviewRegistDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        //review 객체 생성
        Review review = new Review(
                reviewRegistDto.getStar(),
                reviewRegistDto.getImage(),
                reviewRegistDto.getContent()
        );

        //연관관계 등록 : 유저, 상품
        review.setUser(user);
        Product product = productRepository.findById(reviewRegistDto.getProduct_id())
                .orElseThrow(() -> new IllegalArgumentException("상품 아이디에 해당하는 상품이 없습니다."));
        review.setProduct(product);

        //리뷰 저장
        reviewRepository.save(review);
    }

    public List<ReviewResultDto> getAllProductReview(Pageable pageable, Long productId) {
        //상품 가져오기
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("상품 아이디에 해당하는 상품이 없습니다."));

        //상품 id에 대한 리뷰 얻기
        List<Review> reviews = reviewRepository.findByProductOrderByIdDesc(product, pageable);

        //ResultDto로 변환
        List<ReviewResultDto> reviewResultDtos = new ArrayList<>();
        for (Review review : reviews){
            reviewResultDtos.add(new ReviewResultDto(
                    review.getId(),
                    review.getStar(),
                    review.getImage(),
                    review.getContent(),
                    review.getLikeCnt()
            ));
        }

        return reviewResultDtos;
    }

    public List<ReviewResultDto> getAllUserReview(Pageable pageable) {
        //유저 정보 얻기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        //유저에 대한 리뷰 얻기
        List<Review> reviews = reviewRepository.findByUserOrderByIdDesc(user, pageable);

        //ResultDto로 변환
        List<ReviewResultDto> reviewResultDtos = new ArrayList<>();
        for (Review review : reviews){
            reviewResultDtos.add(new ReviewResultDto(
                    review.getId(),
                    review.getStar(),
                    review.getImage(),
                    review.getContent(),
                    review.getLikeCnt()
            ));
        }

        return reviewResultDtos;
    }

    public void modifyReview(Long reviewId, ReviewModifyDto reviewModifyDto) throws Throwable {
        //리뷰 엔티티를 찾아서 update
        //왜 이건 그냥 안되지.. 에러처리
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new IllegalArgumentException("리뷰 아이디에 해당하는 리뷰가 없습니다."));

        review.update(reviewModifyDto);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
