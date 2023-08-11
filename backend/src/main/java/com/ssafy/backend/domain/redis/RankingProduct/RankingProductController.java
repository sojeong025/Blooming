package com.ssafy.backend.domain.redis.RankingProduct;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.product.dto.ProductRankingDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Tag(name = "랭킹 API")
@RestController
@RequiredArgsConstructor
public class RankingProductController {

    private final RedisTemplate redisTemplate;
    private final ProductRepository productRepository;

    @Operation(description = "예약 랭킹 상위 10개의 상품 조회")
    @GetMapping("/ranking")
    public ResponseEntity<BasicResponse> getRanking(){
        //랭킹 검색 : redis
        String key = "ranking";
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeWithScores(key, 0, 9);

        List<ProductRankingDto> productRankingDtoList = new ArrayList<>();
        for (ZSetOperations.TypedTuple<String> tuple : typedTuples){
            //product id에 해당하는 정보
            productRankingDtoList.add(productRepository.getProductRankingInfo(Long.valueOf(tuple.getValue())));
        }

        BasicResponse basicResponse = BasicResponse.builder()
                                        .code(HttpStatus.OK.value())
                                        .httpStatus(HttpStatus.OK)
                                        .message("예약많은 상품 랭킹 조회 성공")
                                        .count(productRankingDtoList.size())
                                        .result(Collections.singletonList(productRankingDtoList)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
