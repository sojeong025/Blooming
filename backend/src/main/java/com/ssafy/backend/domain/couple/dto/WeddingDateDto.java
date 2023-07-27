package com.ssafy.backend.domain.couple.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class WeddingDateDto {
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate weddingDate;

	public WeddingDateDto(LocalDate weddingDate) {
		this.weddingDate = weddingDate;
	}
}