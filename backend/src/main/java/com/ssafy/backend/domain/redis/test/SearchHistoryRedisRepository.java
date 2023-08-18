package com.ssafy.backend.domain.redis.test;

import org.springframework.data.repository.CrudRepository;

public interface SearchHistoryRedisRepository extends CrudRepository<SearchHistory, String> {

}