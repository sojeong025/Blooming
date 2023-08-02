package com.ssafy.backend.domain.reservation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class ReservationRegistDto {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservedDate;
    @DateTimeFormat(pattern = "kk:mm")
    private LocalTime reservedTime;
    private Long product_id;

}
