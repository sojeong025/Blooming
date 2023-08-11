package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.dto.ProductRecentDto;
import com.ssafy.backend.domain.product.dto.ProductRankingDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductDetailResult;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.user.User;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select new com.ssafy.backend.domain.product.dto.ProductResultDto(p.id, p.itemName, p.brief, p.thumbnail, p.company, p.companyTime, p.companyAddress, w) from Product p left join Wishlist w on p = w.product and w.user = :user where p.productType = :productType")
    Slice<ProductResultDto> getProductWithWish(@Param("user") User user, @Param("productType") ProductType productType, Pageable pageable);

    @Query("select new com.ssafy.backend.domain.product.dto.ProductDetailResult(p, CASE WHEN COUNT(w) > 0 THEN true ELSE false END) from Product p left join Wishlist w on p = w.product and w.user = :user where p.id = :productId")
    ProductDetailResult getProductDetail(@Param("user") User user, @Param("productId") long productId);

    @Query("select new com.ssafy.backend.domain.product.dto.ProductRecentDto(p.id, p.productType, p.itemName, p.thumbnail, w) from Product p left join Wishlist w on p = w.product and w.user = :user where p.id = :productId")
    ProductRecentDto getProductRecentInfo(@Param("productId") Long productId, @Param("user") User user);

    @Query("select new com.ssafy.backend.domain.product.dto.ProductRankingDto(p.id, p.itemName, p.productType, p.brief, p.company, p.thumbnail) from Product p where p.id = :productId")
    ProductRankingDto getProductRankingInfo(@Param("productId") Long productId);
}
