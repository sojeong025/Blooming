package com.ssafy.backend.domain.redis.fcm;

import org.springframework.data.repository.CrudRepository;

public interface FcmTokenRepository extends CrudRepository<FcmToken, String> {
}
