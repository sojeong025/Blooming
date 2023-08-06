package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.product.ProductType;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

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
    private String detailImage1;
    private String detailImage2;
    private String detailImage3;

    //업체 정보
    private String company;
    private String companyTime;
    private String companyAddress;
}
