package com.ssafy.backend.domain.wishlist.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.wishlist.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "찜 API", description = "웨딩 상품 찜 API")
@RestController
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @Operation(summary = "찜 등록하기", description = "상품 찜 하면 DB에 등록합니다.")
    @Parameter(name = "ProductId", description = "찜한 상품의 Product ID를 넘겨주세요.")
    @PostMapping("/wishlist/{productId}")
    public ResponseEntity<BasicResponse> registWishlist(@PathVariable Long productId) {
        wishlistService.registWishlist(productId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("찜 등록 성공")
                .count(0).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


    @Operation(summary = "찜 삭제하기", description = "찜 취소 할래요.")
    @Parameter(name = "productId", description = "찜 취소할 상품의 ID를 넘겨주세요")
    @DeleteMapping("/wishlist/{productId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Long productId) {
        wishlistService.deleteWishlist(productId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("찜 삭제 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }


    // 이렇게 묶어서 주는방법 vs 걍 api 따로 주기 => 프론트에서는 따로 주는게 편할거같음
    @Operation(summary = "찜 전체 조회", description = "내가 찜한 상품ID 리스트와 나의 커플이 찜한 상품ID 리스트를 모두 받아 옵니다.")
    @GetMapping("/wishlist")
    public ResponseEntity<BasicResponse> getWishlist() {
        List<Long> mywishlists = wishlistService.getAllWishtlist();
        List<Long> couplewishlists = wishlistService.getAllCoupleWishlist();
        // 이렇게 주면 프론트에서 널인거 처리 따로 해야하는데 리팩 필요
        Map<String, List<Long>> wishlists = new HashMap<>();
        wishlists.put("mywishlist",mywishlists);
        wishlists.put("couplewishlist",couplewishlists);

        BasicResponse basicResponse;
        if (mywishlists.isEmpty() && couplewishlists.isEmpty()) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("찜 조회 실패")
                    .count(0).build();
        } else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("찜 조회 성공")
                    .count(mywishlists.size() + couplewishlists.size())
                    .result(Collections.singletonList(wishlists)).build();
        }
        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }

}
