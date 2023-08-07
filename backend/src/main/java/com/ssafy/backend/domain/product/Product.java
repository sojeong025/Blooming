package com.ssafy.backend.domain.product;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalTime;

@Entity
@Getter
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "PRODUCT_ID")
    private Long id;
    //지역은 일단 뺌

    //상품 정보
    @Enumerated(EnumType.STRING)
    private ProductType productType;
    private String itemName;
    private String brief;
//    private String detail;

    //이미지 정보-- 미정
    private String thumbnail; //대표이미지
    // private String detailImage1;
    // private String detailImage2;
    // private String detailImage3;

    //업체 정보
    private String company;
    private String companyTime;
    private String companyAddress;
    
    //연관관계는 만들면서 하나씩 추가

}
