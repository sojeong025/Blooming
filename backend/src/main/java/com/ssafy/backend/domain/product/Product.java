package com.ssafy.backend.domain.product;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "PRODUCT_ID")
    private Long id;

    //상품 정보
    @Enumerated(EnumType.STRING)
    private ProductType productType;
    private String itemName;
    private String brief;

    private String thumbnail; //대표이미지

    //업체 정보
    private String company;
    private String companyTime;
    private String companyAddress;

    private Integer reservationCount;

    //연관관계는 만들면서 하나씩 추가
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<ProductImage> productImages = new ArrayList<>();

    public void setImage(ProductImage image) {
        this.getProductImages().add(image);
        image.setProduct(this);
    }

    public void addReservationCount() {
        this.reservationCount += 1;
    }

}
