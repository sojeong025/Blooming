package com.ssafy.backend.domain.product.dto;

import com.ssafy.backend.domain.product.Product;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDetailResult {
	private Product product;
	private boolean isWish;

	public ProductDetailResult(Product product, boolean isWish) {
		this.product = product;
		this.isWish = isWish;
	}
}
