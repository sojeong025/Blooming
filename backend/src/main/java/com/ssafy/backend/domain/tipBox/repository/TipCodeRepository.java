package com.ssafy.backend.domain.tipBox.repository;

import com.ssafy.backend.domain.tipBox.TipCode;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.annotation.Nonnull;
import java.util.List;

public interface TipCodeRepository extends JpaRepository<TipCode, Long> {
    TipCode findByLeftDay(int leftDay);
//    List<TipCode> f1indAll();

}
