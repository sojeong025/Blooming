package com.ssafy.backend.domain.couple.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.backend.domain.couple.Couple;

public interface CoupleRepository extends JpaRepository<Couple, Long> {

}
