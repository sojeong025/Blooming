package com.ssafy.backend.domain.product.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductDetailDto;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository productRepository;
	private final UserRepository userRepository;

	public Slice<ProductResultDto> getTypeProduct(ProductType productType, int page, int size) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByEmail(authentication.getName())
				.orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

		PageRequest pageRequest = PageRequest.of(page, size);

		return productRepository.getProductWithWish(user, productType, pageRequest);
	}

	public List<ProductDetailDto> getProductImage(long productId) {
		Product product = productRepository.findById(productId)
				.orElseThrow(() -> new NoSuchElementException("해당하는 상품 정보가 없습니다."));

		return product.getProductImages().stream()
				.map(productImage -> new ProductDetailDto(productImage.getImage()))
				.collect(Collectors.toList());
	}
}
