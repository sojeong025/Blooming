package com.ssafy.backend.global.redis.test;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;

@RedisHash // JPA에서의 @Entity역할
@Builder
@Getter
public class SearchHistory {
    @Id
    private Long id;
    private String key;
    private String value;

    @Override
    public String toString() {
        return "SearchHistory{" +
                "id=" + id +
                ", key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
