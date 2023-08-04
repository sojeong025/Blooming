package com.ssafy.backend.domain.liked.repository;

import com.ssafy.backend.domain.liked.Liked;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikedRepository  extends JpaRepository<Liked, Long> {
}
