package com.ssafy.backend.domain.product;

import static javax.persistence.FetchType.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;

@Entity
@Getter
public class ProductImage {

	@Id
	@GeneratedValue
	@Column(name = "PRODUCT_IMAGE_ID")
	private Long id;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "PRODUCT_ID")
	private Product product;

	private String image;
}
