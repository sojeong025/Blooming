package com.ssafy.backend.domain.liked.controller;

import com.ssafy.backend.domain.liked.service.LikedService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "상품 후기 도움돼요(좋아요) API", description = "상품 후기 도움돼요(좋아요) 등록 취소 조회 API")
@RestController
@RequiredArgsConstructor
public class LikedController {
    // 등록, 삭제, 몇개인지 출력 까지
    private final LikedService likedService;

}
