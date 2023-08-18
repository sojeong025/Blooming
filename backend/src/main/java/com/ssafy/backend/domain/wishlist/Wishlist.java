package com.ssafy.backend.domain.wishlist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.backend.domain.common.CreatedBaseEntity;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Wishlist extends CreatedBaseEntity {
    @Id
    @GeneratedValue
    @Column(name = "WISHLIST_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="PRODUCT_ID")
    private Product product;

    public Wishlist(User user, Product product) {
        this.user = user;
        this.product = product;
    }

}