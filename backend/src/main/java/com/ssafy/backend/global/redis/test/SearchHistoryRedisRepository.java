package com.ssafy.backend.global.redis.test;

import org.springframework.data.repository.CrudRepository;

public interface SearchHistoryRedisRepository extends CrudRepository<SearchHistory, String> {

}