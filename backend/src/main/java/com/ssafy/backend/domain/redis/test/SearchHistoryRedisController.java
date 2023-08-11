package com.ssafy.backend.domain.redis.test;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class SearchHistoryRedisController {

    private final SearchHistoryRedisRepository searchHistoryRedisRepository;

    @PostMapping("/redis")
    public String insert(@RequestBody SearchHistoryRegistDto searchHistoryRegistDto){
        System.out.println(searchHistoryRegistDto);

        SearchHistory searchHistory = new SearchHistory(0L, searchHistoryRegistDto.getKey(), searchHistoryRegistDto.getValue());
        System.out.println("redis save : " + searchHistory);
        searchHistoryRedisRepository.save(searchHistory);
        return "저장 완료";
    }

    @GetMapping("/redis")
    public Optional<SearchHistory> result(){
        Optional<SearchHistory> searchHistories = searchHistoryRedisRepository.findById("0");
        return searchHistories;
    }
}
