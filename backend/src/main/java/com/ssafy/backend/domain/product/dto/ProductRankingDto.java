package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.wishlist.Wishlist;
import lombok.Getter;

@Getter
public class ProductRankingDto {
    private Long productId;

    //상품 정보
    private String itemName;
    private ProductType productType;
    private String brief;

    private String company;

    //이미지 정보-- 미정
    private String thumbnail; //대표이미지

    public ProductRankingDto(Long productId, String itemName, ProductType productType, String brief, String company, String thumbnail) {
        this.productId = productId;
        this.itemName = itemName;
        this.productType = productType;
        this.brief = brief;
        this.company = company;
        this.thumbnail = thumbnail;
    }
}
