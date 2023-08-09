package com.ssafy.backend.domain.wishlist.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.Wishlist;
import com.ssafy.backend.domain.wishlist.dto.WishlistDto;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;

import lombok.RequiredArgsConstructor;

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

    public void deleteWishlist(Long productId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        wishlistRepository.deleteByProductIdAndUserId(productId, user.getId());
    }



    // 리팩토링 한다면
    // 어차피 내가 찜한거, 커플이 찜한거 둘다 호출 할 건데 따로 구하지 말고
    // 한번에 구해서 내려 주는게 어떨까
    public List<Product> getAllWishtlist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        List<Wishlist> wishlists = wishlistRepository.findAllByUser(user);
        List<Product> result = new ArrayList<>();
        for (Wishlist wish : wishlists){
            result.add(wish.getProduct());
        }
        return result;
    }

    // 커플이 등록한 찜 리스트 출력
    // 커플 없을경우 예외처리 해라
    public  List<WishlistDto> getAllCoupleWishlist(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        
        // 커플 가져와서 커플의 아이디로 검색
        Couple couple = user.getCouple();
        List<User> userList = couple.getUsers();
        System.out.println("위시리스트 커플 사이즈 출력");
        System.out.println(userList.size());

        List<WishlistDto> wishlistDtos = new ArrayList<>();
        for(User u : userList) {
            List<Wishlist> wishlists = wishlistRepository.findAllByUser(u);
            for (Wishlist wishlist : wishlists) {
                wishlistDtos.add(new WishlistDto(wishlist.getProduct()));
            }
        }

        return wishlistDtos;
    }
}
