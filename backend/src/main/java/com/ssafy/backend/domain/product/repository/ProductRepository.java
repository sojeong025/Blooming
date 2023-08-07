package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {


    @Query("SELECT p, CASE WHEN (w.user IS NULL) THEN true ELSE false END AS wish_or_not FROM Product p LEFT JOIN Wishlist w WITH w.user = :user WHERE p.productType = :productType")
    List<Object[]> getProductWithWish(@Param("user") User user, @Param("productType") ProductType productType, Pageable pageable);

    // 처리할 거 : user_id, page, productType
    // ORDER BY wish_or_not ASC 걍 결과 받아서 정렬해도...
}
