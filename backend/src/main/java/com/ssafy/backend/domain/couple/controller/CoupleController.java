package com.ssafy.backend.domain.couple.controller;

import java.time.LocalDate;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.couple.dto.WeddingDateDto;
import com.ssafy.backend.domain.couple.service.CoupleService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "커플 API", description = "커플 관련 API")
@RestController
@RequiredArgsConstructor
public class CoupleController {

	private final CoupleService coupleService;

	@PostMapping("/wedding-date")
	public String setWeddingDate(@RequestBody WeddingDateDto weddingDateDto) throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("authentication = " + authentication);

		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		LocalDate weddingDate = weddingDateDto.getWeddingDate();
		coupleService.setWeddingDate(weddingDate, authentication.getName());

		return "웨딩날짜 저장됐다! 메인페이지 가라!";
	}
}
