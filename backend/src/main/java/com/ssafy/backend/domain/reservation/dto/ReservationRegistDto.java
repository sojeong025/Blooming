package com.ssafy.backend.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationRegistDto {

    private LocalDate reserved_at;
    private Long product_id;

}
