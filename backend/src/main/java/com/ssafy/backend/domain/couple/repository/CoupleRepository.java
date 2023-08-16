package com.ssafy.backend.domain.couple.repository;

import com.ssafy.backend.domain.couple.Couple;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CoupleRepository extends JpaRepository<Couple, Long> {

    Optional<Couple> findByCoupleCode(String coupleCode);

    List<Couple> findAllByWeddingDate(LocalDate weddingDate);

}
