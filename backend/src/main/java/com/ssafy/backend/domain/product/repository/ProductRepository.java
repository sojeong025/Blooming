package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {


    @Query("SELECT new com.ssafy.backend.domain.product.dto.ProductResultDto(p.id, p.itemName, p.brief, p.thumbnail, p.detailImage1, p.detailImage2, p.detailImage3, p.company, p.companyTime, p.companyAddress, w.user) FROM Product p LEFT JOIN Wishlist w ON w.user.id = :userId WHERE p.productType = :productType ")
    List<ProductResultDto> getProductWithWish(@Param("userId") Long userId, @Param("productType") ProductType productType, Pageable pageable);

    // 처리할 거 : user_id, page, productType
    // ORDER BY wish_or_not ASC 걍 결과 받아서 정렬해도...
}
