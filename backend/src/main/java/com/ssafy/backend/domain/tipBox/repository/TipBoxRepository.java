package com.ssafy.backend.domain.tipBox.repository;

import com.ssafy.backend.domain.tipBox.TipBox;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipBoxRepository extends JpaRepository<TipBox, Long> {
    List<TipBox> findAllByTipCodeId(long tipCodeId);

}
