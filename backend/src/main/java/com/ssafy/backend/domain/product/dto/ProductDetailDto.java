package com.ssafy.backend.domain.product.dto;

import java.util.List;

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

	public ProductDetailDto(Long id, String itemName, String brief, String thumbnail, String company,
			String companyTime,
			String companyAddress, List<ProductImage> images, boolean isWish) {
		this.id = id;
		this.itemName = itemName;
		this.brief = brief;
		this.thumbnail = thumbnail;
		this.company = company;
		this.companyTime = companyTime;
		this.companyAddress = companyAddress;
		this.images = images;
		this.isWish = isWish;
	}
}
