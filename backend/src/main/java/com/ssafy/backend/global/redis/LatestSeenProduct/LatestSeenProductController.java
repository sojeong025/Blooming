package com.ssafy.backend.global.redis.LatestSeenProduct;

import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@Tag(name = "최근 본 상품 아이디 리스트 조회")
@RestController
@RequiredArgsConstructor
public class LatestSeenProductController {

    private final UserRepository userRepository;
    private final RedisTemplate redisTemplate;

    @Operation(description = "로그인 한 유저의 최근 본 상품 목록 10개 조회")
    @GetMapping("/latestSeenProduct")
    public Set<ZSetOperations.TypedTuple<String>> getList(){
        //로그인 한 유저 찾기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        //로그인 한 유저가 본 상품 목록 검색 : redis
        String key = "latest-seen-products:" + Long.valueOf(user.getId());
        ZSetOperations<String, String> stringStringZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = stringStringZSetOperations.reverseRangeByScoreWithScores(key, 0, 10);

        System.out.println(typedTuples);
        //형태를 보기 위해 일단 출력
        return typedTuples;
    }
}
