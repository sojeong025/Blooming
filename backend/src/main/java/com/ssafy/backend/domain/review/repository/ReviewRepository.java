package com.ssafy.backend.domain.review.repository;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.review.Review;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {


    List<Review> findByProductOrderByIdDesc(Product product, Pageable pageable);

    List<Review> findByUserOrderByIdDesc(User user, Pageable pageable);

}
