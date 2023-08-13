package com.ssafy.backend.domain.reservation.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
public class ReservationRegistDto {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate reservedDate;

    @Schema(example = "14:30")
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime reservedTime;
    private Long product_id;

}
