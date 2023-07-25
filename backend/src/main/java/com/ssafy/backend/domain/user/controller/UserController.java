package com.ssafy.backend.domain.user.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.service.UserService;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "회원 API", description = "카카오톡 로그인 회원 API")
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	// private final JwtService jwtService;

	// @Operation(summary = "임시 리다이렉트 페이지")
	@GetMapping("/oauth2/sign-up")
	public String signUpForm() {
		return "임시 리다이렉트 페이지";
	}

	@Operation(summary = "추가 정보 받기", description = "카카오톡 로그인 후 필요한 개인정보를 입력받습니다.")
	@Parameter(name = "userSignDto", description = "회원가입이 추가로 필요한 개인정보 Dto")
	@PostMapping("/sign-up")
	public String signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		userService.signUp(userSignUpDto, authentication.getName());
		return "회원가입 성공";
	}

	@Hidden
	@GetMapping("/jwt-test")
	public String jwtTest() {
		return "jwtTest 요청 성공";
	}
}