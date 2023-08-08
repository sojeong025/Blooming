package com.ssafy.backend.global.redis.repository;

import com.ssafy.backend.global.redis.SearchHistory;
import org.springframework.data.repository.CrudRepository;

public interface SearchHistoryRedisRepository extends CrudRepository<SearchHistory, String> {

}