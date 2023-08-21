package com.ssafy.backend.domain.redis.LatestSeenProduct;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.SeenProduct;
import com.ssafy.backend.domain.product.dto.ProductRecentDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.product.repository.SeenProductRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.Wishlist;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;
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
    private final SeenProductRepository seenProductRepository;
    private final WishlistRepository wishlistRepository;
    private static List<Long> sqlList = new ArrayList<>();
    private static List<Long> redList = new ArrayList<>();

    @Operation(description = "로그인 한 유저의 최근 본 상품 목록 10개 조회")
    @GetMapping("/latestSeenProduct")
    public ResponseEntity<BasicResponse> getList(){
        //로그인 한 유저 찾기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        // 시간 측정
        long startTime = 0L;
        long endTime = 0L;


        // SQL로 최근 본 상품 조회
        startTime = System.currentTimeMillis();
        List<SeenProduct> seenProductList = seenProductRepository.findAllByUserIdOrderByCreatedDateDesc(user.getId());
        List<ProductRecentDto> productRecentDtos = new ArrayList<>();
        for(int idx=0;idx<10;idx++){
            SeenProduct seenProduct= seenProductList.get(idx);
            Product product = seenProduct.getProduct();
            Wishlist wishlist = wishlistRepository.findByProductIdAndUserId(product.getId(), user.getId())
                    .orElse(null);
            productRecentDtos.add(new ProductRecentDto(product.getId(), product.getProductType(), product.getItemName(),product.getThumbnail(),wishlist,product.getCompany()));
        }

        endTime = System.currentTimeMillis();
        System.out.println("SQL 최근 본 상품 조회 소요시간 : "+(endTime - startTime)+"ms");
        sqlList.add((endTime - startTime));


        //로그인 한 유저가 본 상품 목록 검색 : redis
        startTime = System.currentTimeMillis();
        String key = "latest-seen-products:" + Long.valueOf(user.getId());
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeWithScores(key, 0, 9);

        //형태를 보기 위해 일단 출력
//        System.out.println(typedTuples);

        //상품 정보를 리턴 : productId, 썸네일 사진, 제품명, productType, 찜정보 + company

        List<ProductRecentDto> productRecentDtoList = new ArrayList<>();
        for (ZSetOperations.TypedTuple<String> tuple : typedTuples){
            productRecentDtoList.add(productRepository.getProductRecentInfo(Long.valueOf(tuple.getValue()), user));
        }

        endTime = System.currentTimeMillis();
        System.out.println("Redis 최근 본 상품 조회 소요시간 : "+(endTime - startTime)+"ms");
        redList.add((endTime - startTime));

        System.out.println("TIME LIST SIZE = "+redList.size());
        if(redList.size()==100){
            Long sqlSum = 0L;
            Long redSum = 0L;
            for(Long l : sqlList)
                sqlSum+=l;
            for(Long l : redList)
                redSum+=l;
            float sqlAvg = (float) sqlSum /100;
            float redAvg = (float) redSum /100;
            float sqlSec = (float) sqlSum/1000;
            float redSec = (float) redSum/1000;

            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("최근 본 상품 조회 100번 실행 시 소요시간");
            System.out.println("SQL   사용 시 : "+sqlSec+"초, 평균 :"+sqlAvg+"ms");
            System.out.println("Redis 사용 시 : "+redSec+"초, 평균 :"+redAvg+"ms");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
            System.out.println("****************************************************************************");
        }

        BasicResponse basicResponse;
        basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("최근 본 상품 조회 성공")
                .count(productRecentDtoList.size())
                .result(Collections.singletonList(productRecentDtoList)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
