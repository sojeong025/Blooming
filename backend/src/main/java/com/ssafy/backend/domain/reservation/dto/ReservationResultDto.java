package com.ssafy.backend.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ReservationResultDto {
    private Long reservationId;
    private LocalDate reservedAt;
    private Long productId;
}
