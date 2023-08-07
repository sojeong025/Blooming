package com.ssafy.backend.domain.reservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;
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
