package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
