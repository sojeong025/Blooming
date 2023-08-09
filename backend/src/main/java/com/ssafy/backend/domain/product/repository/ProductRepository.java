package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductDetailDto;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select new com.ssafy.backend.domain.product.dto.ProductResultDto(p.id, p.itemName, p.brief, p.thumbnail, p.company, p.companyTime, p.companyAddress, w) from Product p left join Wishlist w on p = w.product and w.user = :user where p.productType = :productType")
    Slice<ProductResultDto> getProductWithWish(@Param("user") User user, @Param("productType") ProductType productType, Pageable pageable);

    @Query("select new com.ssafy.backend.domain.product.dto.ProductDetailDto(p, CASE WHEN COUNT(w) > 0 THEN true ELSE false END) from Product p left join Wishlist w on p = w.product and w.user = :user where p.id = :productId")
    ProductDetailDto getProductDetail(@Param("user") User user, @Param("productId") long productId);
}
