package com.ssafy.backend.domain.couple.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.user.User;

public interface CoupleRepository extends JpaRepository<Couple, Long> {

	Optional<Couple> findByCoupleCode(String coupleCode);
}
