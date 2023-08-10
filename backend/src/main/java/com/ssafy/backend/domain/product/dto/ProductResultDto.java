package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.wishlist.Wishlist;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductResultDto {

    private Long id;

    //상품 정보
    private String itemName;
    private String brief;
//    private String detail;

    //이미지 정보-- 미정
    private String thumbnail; //대표이미지

    //업체 정보
    private String company;
    private String companyTime;
    private String companyAddress;

    //찜 정보
    private boolean isWish;

    // 후기 별점 평균
    private float starRate;

    public ProductResultDto(Long id, String itemName, String brief, String thumbnail, String company, String companyTime, String companyAddress, Wishlist wishlist) {
        this.id = id;
        this.itemName = itemName;
        this.brief = brief;
        this.thumbnail = thumbnail;
        this.company = company;
        this.companyTime = companyTime;
        this.companyAddress = companyAddress;
        this.isWish = wishlist != null;
    }
}
