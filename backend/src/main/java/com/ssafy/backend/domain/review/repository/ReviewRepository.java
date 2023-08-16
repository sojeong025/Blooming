package com.ssafy.backend.domain.review.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.review.dto.MyReviewDto;
import com.ssafy.backend.domain.review.dto.ProductReviewDto;
import com.ssafy.backend.domain.user.User;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new com.ssafy.backend.domain.review.dto.ProductReviewDto(r, CASE WHEN COUNT(l) > 0 THEN true ELSE false END) from Review r left join fetch Liked l on l.review = r and l.user = :user where r.product.id = :productId group by r")
    Slice<ProductReviewDto> findReviewByProduct(@Param("productId") Long productId, @Param("user") User user, Pageable pageable);

    @Query("select new com.ssafy.backend.domain.review.dto.MyReviewDto(r) from Review r where r.user = :user")
    Slice<MyReviewDto> findReviewByUser(@Param("user") User user, Pageable pageable);

//    @Query("select avg(r.star) as starRate, count(r) as reviewCount from Review r where r.product.id = :productId")
//    Map<String, Object> findStarRate(@Param("productId") Long productId);

    void deleteAllByUserId(Long userId);

}
