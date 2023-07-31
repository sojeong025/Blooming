package com.ssafy.backend.domain.product.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "상품 API", description = "상품 읽기 API")
@RestController
@RequiredArgsConstructor
public class ProductController {
    //상품 읽기 : 타입별 읽기(타입), 하나만 읽기(상품 id)
    //지역 추가되면 : 지역별 읽기


}
