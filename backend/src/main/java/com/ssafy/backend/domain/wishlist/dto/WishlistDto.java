package com.ssafy.backend.domain.wishlist.dto;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.user.User;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class WishlistDto {
	private Long productId;
	private ProductType productType;
	private String thumbnail;
	private String company;
	private String address;
	private String userEmail;
	private String userName;

	public WishlistDto(Product product, User user) {
		this.productId = product.getId();
		this.productType = product.getProductType();
		this.thumbnail = product.getThumbnail();
		this.company = product.getCompany();
		this.address = product.getCompanyAddress();
		this.userEmail = user.getEmail();
		this.userName = user.getName();
	}
}
