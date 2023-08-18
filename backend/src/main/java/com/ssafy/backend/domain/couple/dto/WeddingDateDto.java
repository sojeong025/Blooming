package com.ssafy.backend.domain.couple.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class WeddingDateDto {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate weddingDate;

    public WeddingDateDto(LocalDate weddingDate) {
        this.weddingDate = weddingDate;
    }
}