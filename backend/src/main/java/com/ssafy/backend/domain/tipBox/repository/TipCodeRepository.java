package com.ssafy.backend.domain.tipBox.repository;

import com.ssafy.backend.domain.tipBox.TipCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipCodeRepository extends JpaRepository<TipCode, Long> {
    TipCode findByLeftDay(int leftDay);
}
