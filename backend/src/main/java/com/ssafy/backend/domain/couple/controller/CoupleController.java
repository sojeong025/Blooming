package com.ssafy.backend.domain.couple.controller;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.couple.dto.WeddingDateDto;
import com.ssafy.backend.domain.couple.service.CoupleService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "커플 API", description = "커플 관련 API")
@RestController
@RequiredArgsConstructor
public class CoupleController {

	private final CoupleService coupleService;

	@Operation(summary = "결혼식 예정 날짜 등록", description = "회원가입 후 결혼식 날짜가 정해진 유저의 결혼식 예정 날짜를 받습니다.")
	@Parameter(name = "weddingDateDto", description = "결혼식 예정 날짜 dto")
	@PostMapping("/wedding-date")
	public String registerWeddingDate(@RequestBody WeddingDateDto weddingDateDto) throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("authentication = " + authentication);

		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		LocalDate weddingDate = weddingDateDto.getWeddingDate();
		coupleService.registerWeddingDate(weddingDate, authentication.getName());

		return "웨딩날짜 저장됐다! 메인페이지 가라!";
	}

	@Operation(summary = "결혼식 예정 날짜 조회", description = "커플의 결혼식 예정 날짜를 조회합니다.")
	@Parameter(name = "weddingDateDto", description = "결혼식 예정 날짜 dto")
	@GetMapping("/wedding-date")
	public ResponseEntity<WeddingDateDto> getWeddingDate() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		LocalDate weddingDate = coupleService.getWeddingDate(authentication.getName());
		WeddingDateDto weddingDateDto = new WeddingDateDto(weddingDate);

		return new ResponseEntity<>(weddingDateDto, HttpStatus.OK);
	}
}
