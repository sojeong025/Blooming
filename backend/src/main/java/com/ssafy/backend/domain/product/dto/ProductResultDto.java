package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
//@AllArgsConstructor
public class ProductResultDto {

    private Long id;

    //상품 정보
    private String itemName;
    private String brief;
//    private String detail;

    //이미지 정보-- 미정
    private String thumbnail; //대표이미지
//    private String detailImage1;
//    private String detailImage2;
//    private String detailImage3;

    //업체 정보
    private String company;
    private String companyTime;
    private String companyAddress;

    //찜 정보
    private boolean isWish;

    public ProductResultDto(Long id, String itemName, String brief, String thumbnail, String company, String companyTime, String companyAddress, boolean isWish) {
        this.id = id;
        this.itemName = itemName;
        this.brief = brief;
        this.thumbnail = thumbnail;
//        this.detailImage1 = detailImage1;
//        this.detailImage2 = detailImage2;
//        this.detailImage3 = detailImage3;
        this.company = company;
        this.companyTime = companyTime;
        this.companyAddress = companyAddress;
        this.isWish = isWish;
    }
}
