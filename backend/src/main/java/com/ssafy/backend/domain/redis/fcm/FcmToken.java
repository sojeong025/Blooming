package com.ssafy.backend.domain.redis.fcm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash // JPA에서의 @Entity역할
@Builder
@Getter
@AllArgsConstructor
public class FcmToken {
    @Id
    private String key;
    private String value;
}
