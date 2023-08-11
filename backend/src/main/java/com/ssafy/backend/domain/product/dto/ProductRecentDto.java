package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.wishlist.Wishlist;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class ProductRecentDto {
    private Long productId;

    //상품 정보
    private String itemName;

    //이미지 정보-- 미정
    private String thumbnail; //대표이미지

    //찜 정보
    private boolean isWish;

    public ProductRecentDto(Long id, String itemName, String thumbnail, Wishlist wishlist) {
        this.productId = id;
        this.itemName = itemName;
        this.thumbnail = thumbnail;
        this.isWish = (wishlist != null);
    }
}
