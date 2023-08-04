package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductType(Long productType);
}
