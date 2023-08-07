package com.ssafy.backend.domain.product.service;

import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

//        List<ProductResultDto> result = productRepository.getProductWithWish(user.getId(), productType, pageable);
        PageRequest pageRequest = PageRequest.of(page, size);

        //        //타입에 맞는 상품 받아옴
//        List<Product> products = productRepository.findByProductType(productType, pageable);
//
//        //유저의 찜 받아옴
//        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(user.getId());

        //필터링..
//        List<ProductResultDto> productResultDtoList = new ArrayList<>();
//        for (Product product : page.getContent()){
//            ProductResultDto productResultDto = new ProductResultDto(
//                    product.getId(),
//                    product.getItemName(),
//                    product.getBrief(),
//                    product.getThumbnail(),
//                    product.getCompany(),
//                    product.getCompanyTime(),
//                    product.getCompanyAddress(),
//                     //수정
//            );
//        }

        return productRepository.getProductWithWish(user, productType, pageRequest);
    }
}
