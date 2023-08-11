package com.ssafy.backend.global.redis.LatestSeenProduct;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.product.dto.ProductRecentDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.product.service.ProductService;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Tag(name = "최근 본 상품 아이디 리스트 조회")
@RestController
@RequiredArgsConstructor
public class LatestSeenProductController {

    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;
    private final ProductRepository productRepository;

    @Operation(description = "로그인 한 유저의 최근 본 상품 목록 10개 조회")
    @GetMapping("/latestSeenProduct")
    public ResponseEntity<BasicResponse> getList(){
        //로그인 한 유저 찾기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        //로그인 한 유저가 본 상품 목록 검색 : redis
        String key = "latest-seen-products:" + Long.valueOf(user.getId());
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeWithScores(key, 0, 10);

        //형태를 보기 위해 일단 출력
        System.out.println(typedTuples);

        //상품 정보를 리턴 : productId, 썸네일 사진, 제품명, productType, 찜정보

        BasicResponse basicResponse;
        List<ProductRecentDto> productRecentDtoList = new ArrayList<>();
        for (ZSetOperations.TypedTuple<String> tuple : typedTuples){
            productRecentDtoList.add(productRepository.getProductRecentInfo(Long.valueOf(tuple.getValue()), user));
        }

        basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("최근 본 상품 조회 성공")
                .count(productRecentDtoList.size())
                .result(Collections.singletonList(productRecentDtoList)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
