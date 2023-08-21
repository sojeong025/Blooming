package com.ssafy.backend.domain.product.repository;

import com.ssafy.backend.domain.product.SeenProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeenProductRepository extends JpaRepository<SeenProduct, Long> {
    List<SeenProduct> findAllByUserIdOrderByCreatedDateDesc(Long userId);
}
