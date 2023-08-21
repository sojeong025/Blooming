package com.ssafy.backend.domain.redis.RankingProduct;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductRankingDto;
import com.ssafy.backend.domain.product.repository.ProductRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "랭킹 API")
@RestController
@RequiredArgsConstructor
public class RankingProductController {

    private final RedisTemplate redisTemplate;
    private final ProductRepository productRepository;

    @Operation(description = "예약 랭킹 상위 10개의 상품 조회")
    @GetMapping("/ranking/{productType}")
    public ResponseEntity<BasicResponse> getRanking(@PathVariable ProductType productType){
        long startTime = System.currentTimeMillis();

        //랭킹 검색 : redis
        String key = "ranking:" + productType;
        Set<ZSetOperations.TypedTuple<String>> typedTuples = redisTemplate.opsForZSet().reverseRangeWithScores(key, 0, 9);

        List<Long> productIds = typedTuples.stream()
                .map(tuple -> Long.valueOf(tuple.getValue()))
                .collect(Collectors.toList());

        List<ProductRankingDto> productRankingDtoList = productRepository.getProductRankingInfo(productIds);

        long endTime = System.currentTimeMillis();
        System.out.println("REDIS 시작 : "+startTime);
        System.out.println("REDIS 종료 : "+endTime);
        System.out.println("REDIS 사용 시"+(endTime-startTime));

        BasicResponse basicResponse = BasicResponse.builder()
                                        .code(HttpStatus.OK.value())
                                        .httpStatus(HttpStatus.OK)
                                        .message("예약많은 상품 랭킹 조회 성공")
                                        .count(productRankingDtoList.size())
                                        .result(Collections.singletonList(productRankingDtoList)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(description = "mysql 버전 예약 랭킹 상위 10개의 상품 조회")
    @GetMapping("/ranking/mysql/{productType}")
    public ResponseEntity<BasicResponse> getMysqlRanking(@PathVariable ProductType productType){
        long startTime = System.currentTimeMillis();

        List<Product> products = productRepository.findIdByProductTypeOrderByReservationCountDesc(productType);
        List<Long> productIds = products.stream()
                .map(Product::getId)
                .collect(Collectors.toList());
        List<ProductRankingDto> productRankingDtoList = productRepository.getProductRankingInfo(productIds);

        // List<Product> productList = productRepository.findTop10ByProductTypeOrderByReservationCountDesc(productType);

        // List<ProductRankingDto> productRankingDtoList = productList.stream()
        //         .map(product -> new ProductRankingDto(product.getId(), product.getItemName(), product.getProductType(),
        //                 product.getBrief(), product.getCompany(), product.getThumbnail()))
        //         .collect(Collectors.toList());

        long endTime = System.currentTimeMillis();
        System.out.println("MYSQL 시작 : "+startTime);
        System.out.println("MYSQL 종료 : "+endTime);
        System.out.println("MYSQL 사용 시"+(endTime-startTime));

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("예약많은 상품 랭킹 조회 성공")
                .count(productRankingDtoList.size())
                .result(Collections.singletonList(productRankingDtoList)).build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
}
