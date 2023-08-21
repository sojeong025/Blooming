package com.ssafy.backend.domain.product;

import com.ssafy.backend.domain.common.CreatedBaseEntity;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SeenProduct extends CreatedBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "SEEN_ID")
    private Long id;

    private Long userId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    public SeenProduct(Long userId, Product product){
        this.userId = userId;
        this.product = product;
    }

}
