package com.ssafy.backend.domain.product.dto;

import java.util.List;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductImage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductDetailDto {

	private Long id;

	//상품 정보
	private String itemName;
	private String brief;

	//이미지 정보-- 미정
	private String thumbnail; //대표이미지

	//업체 정보
	private String company;
	private String companyTime;
	private String companyAddress;

	private List<ProductImage> images;

	//찜 정보
	private boolean isWish;

	public ProductDetailDto(Product product, boolean isWish) {
		this.id = product.getId();
		this.itemName = product.getItemName();
		this.brief = product.getBrief();
		this.thumbnail = product.getThumbnail();
		this.company = product.getCompany();
		this.companyTime = product.getCompanyTime();
		this.companyAddress = product.getCompanyAddress();
		this.images = product.getProductImages();
		this.isWish = isWish;
	}
}
