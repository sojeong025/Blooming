package com.ssafy.backend.domain.product.service;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<ProductResultDto> getTypeProduct(ProductType productType, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));


        List<ProductResultDto> result = productRepository.getProductWithWish(user, productType, pageable);
        System.out.println("product wish Before sort");
        System.out.println(result);
        Collections.sort(result, new Comparator<ProductResultDto>() {
            @Override
            public int compare(ProductResultDto o1, ProductResultDto o2) {
                return (int)(o1.getUser().getId() - o2.getUser().getId());
            }
        });
        System.out.println("product wish After sort");
        System.out.println(result);

        return result;
    }
}
