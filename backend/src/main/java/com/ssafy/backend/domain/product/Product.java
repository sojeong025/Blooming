package com.ssafy.backend.domain.product;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalTime;

@Entity
@Getter
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private Long id;
    //지역은 일단 뺌

    //상품 정보
    private ProductType productType;
    private String name;
    private String thumbnail; //대표이미지 -- 미정
    private String description;

    //업체 정보
//    private String companyName; //보통 상품 이름이 업체 이름
    private String phoneNumber;
    private String address;
    private LocalTime startTime;
    private LocalTime endTime;
    
    //연관관계는 만들면서 하나씩 추가
}
