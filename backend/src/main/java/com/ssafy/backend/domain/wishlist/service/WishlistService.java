package com.ssafy.backend.domain.wishlist.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.Wishlist;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class WishlistService {
    // 찜 기능 요구사항
    // 신랑이 찜한 상품을 신부가 볼때 '신랑이 찜 했어요'라고 알 수 있어야함
    // 등록, 삭제, 조회, 커플이 등록한 찜 조회

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CoupleRepository coupleRepository;
    public void registWishlist(Long productId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName()); //이메일
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product ID에 해당하는 상품이 없습니다."));

        Wishlist wishlist = new Wishlist(user, product);

        wishlistRepository.save(wishlist);
    }

    public void deleteWishlist(Long wishtlistId){
        wishlistRepository.deleteById(wishtlistId);

    }

    public List<Long> getAllWishtlist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Long userId = user.getId();
        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(userId);
        List<Long> result = new ArrayList<>();
        for (Wishlist wish : wishlists){
            result.add(wish.getProduct().getId());
        }
        return result;
    }

    // 커플이 등록한 찜 리스트 출력
    public  List<Long> getAllCoupleWishlist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Long userId = user.getId();
//        Couple couple = coupleRepository.findByCoupleCode()

        List<Wishlist> wishlists = wishlistRepository.findAllByUserId(userId);
        List<Long> result = new ArrayList<>();
        for (Wishlist wish : wishlists){
            result.add(wish.getProduct().getId());
        }
        return result;
    }
}
