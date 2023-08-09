package com.ssafy.backend.domain.wishlist.dto;

import com.ssafy.backend.domain.product.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class WishlistDto {
	private Long productId;
	private String thumbnail;
	private String company;
	private String address;

	public WishlistDto(Product product) {
		this.productId = product.getId();
		this.thumbnail = product.getThumbnail();
		this.company = product.getCompany();
		this.address = product.getCompanyAddress();
	}
}
