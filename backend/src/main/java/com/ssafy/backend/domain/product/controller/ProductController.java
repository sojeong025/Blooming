package com.ssafy.backend.domain.product.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.ProductType;
import com.ssafy.backend.domain.product.dto.ProductResultDto;
import com.ssafy.backend.domain.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Tag(name = "상품 API", description = "상품 읽기 API")
@RestController
@RequiredArgsConstructor
public class ProductController {
    //상품 읽기 : 타입별 읽기(타입), 하나만 읽기(상품 id.. 필요한가)
    //지역 추가되면 : 지역별 읽기

    private final ProductService productService;

    @Operation(summary = "상품 타입별로 상품 한 페이지(4개씩) 조회하기", description = "지정된 타입의 상품을 한 페이지만큼 가져옵니다.")
    @GetMapping("/product/{productType}")
    @Parameter(name = "페이지 번호")
    public ResponseEntity<BasicResponse> getTypeProduct(@PathVariable ProductType productType, Pageable pageable){
        List<Product> products = productService.getTypeProduct(productType, pageable);

        BasicResponse basicResponse;
        if (products == null){
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("상품 타입에 대한 한 페이지 상품 조회 실패")
                    .count(0).build();
        }
        else{
            //dto로 변환
            List<ProductResultDto> productResultDtoList = products.stream()
                    .map(product -> new ProductResultDto(product.getId(), product.getItemName(), product.getBrief(), product.getThumbnail(), product.getDetailImage1(), product.getDetailImage2(), product.getDetailImage3(), product.getCompany(), product.getCompanyTime(), product.getCompanyAddress()))
                    .collect(Collectors.toList());

            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("상품 타입에 대한 한 페이지 상품 조회 성공")
                    .count(productResultDtoList.size())
                    .result(Collections.singletonList(productResultDtoList)).build();
        }
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
