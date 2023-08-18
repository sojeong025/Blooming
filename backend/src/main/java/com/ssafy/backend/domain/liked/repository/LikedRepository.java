package com.ssafy.backend.domain.liked.repository;

import com.ssafy.backend.domain.liked.Liked;
import com.ssafy.backend.domain.user.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikedRepository  extends JpaRepository<Liked, Long> {
    void deleteByUserIdAndReviewId(Long userid, Long reviewId);
    Long countByUserIdAndReviewId(Long userId ,Long reviewId);

    @Modifying
    @Query("DELETE FROM Liked l WHERE l.review IN (SELECT r FROM Review r WHERE r.user = :user)")
    void deleteLikeByUser(@Param("user") User user);

    void deleteAllByUserId(Long userId);
}
