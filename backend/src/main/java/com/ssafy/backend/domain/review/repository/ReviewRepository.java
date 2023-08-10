package com.ssafy.backend.domain.review.repository;

import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.review.dto.ReviewResultDto;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select new com.ssafy.backend.domain.review.dto.ReviewResultDto(r, CASE WHEN COUNT(l) > 0 THEN true ELSE false END) from Review r left join fetch Liked l on l.review = r and l.user.email = :userEmail where r.product.id = :productId")
    Slice<ReviewResultDto> findReviewByProduct(@Param("productId") Long productId, @Param("userEmail") String userEmail, Pageable pageable);

    Slice<Review> findReviewByUser(User user, Pageable pageable);

}
