package com.ssafy.backend.domain.tipBox.repository;

import com.ssafy.backend.domain.tipBox.TipBox;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TipBoxRepository extends JpaRepository<TipBox, Long> {
    List<TipBox> findAllByTipCodeId(long tipCodeId);

    @Query("select tb.content from TipBox tb join TipCode tc on tc.id = tb.tipCode.id where tc.leftDay = :leftday")
    List<String> findContentByTipCode(@Param("leftday") int leftday);

}
