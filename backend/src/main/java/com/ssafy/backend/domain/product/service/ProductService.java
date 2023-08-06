package com.ssafy.backend.domain.product.service;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getTypeProduct(ProductType productType, Pageable pageable) {
        return productRepository.findByProductType(productType, pageable);
    }
}
