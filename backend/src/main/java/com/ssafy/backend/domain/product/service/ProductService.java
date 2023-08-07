package com.ssafy.backend.domain.product.service;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.Wishlist;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final WishlistRepository wishlistRepository;

    public List<ProductResultDto> getTypeProduct(ProductType productType, Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

//        List<ProductResultDto> result = productRepository.getProductWithWish(user.getId(), productType, pageable);

        //타입에 맞는 상품 받아옴
        List<Product> products = productRepository.findByProductType(productType, pageable);

        //유저의 찜 받아옴
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(user.getId());

        //필터링..
        List<ProductResultDto> productResultDtoList = new ArrayList<>();
        for (Product product : products){
            ProductResultDto productResultDto = new ProductResultDto(
                    product.getId(),
                    product.getItemName(),
                    product.getBrief(),
                    product.getThumbnail(),
                    product.getCompany(),
                    product.getCompanyTime(),
                    product.getCompanyAddress(),
                    false //수정
            );
        }

        return productResultDtoList;
    }
}
