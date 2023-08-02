package com.ssafy.backend.domain.user.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserDto;
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

	@Operation(summary = "내 정보 조회", description = "회원가입 시 입력한 내 정보를 조회합니다.")
	@GetMapping("/profile")
	public ResponseEntity<BasicResponse> getProfile() throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		User userProfile = userService.getUserProfile(authentication.getName());

		UserDto userDto = new UserDto(
			userProfile.getEmail(),
			userProfile.getName(),
			userProfile.getNickname(),
			userProfile.getPhoneNumber(),
			userProfile.getGender()
		);

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("회원 정보 조회 성공")
			.count(1)
			.result(Collections.singletonList(userDto))
			.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "추가 정보 받기", description = "카카오톡 로그인 후 필요한 개인정보를 입력받습니다.")
	@Parameter(name = "userSignDto", description = "회원가입이 추가로 필요한 개인정보 Dto")
	@PostMapping("/sign-up")
	public ResponseEntity<BasicResponse> signUp(@RequestBody UserSignUpDto userSignUpDto) throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		userService.signUp(userSignUpDto, authentication.getName());

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("회원 가입 성공").build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 정보 수정", description = "조회된 내 정보를 수정합니다.")
	@Parameter(name = "userDto", description = "내 정보 수정을 위한 Dto")
	@PutMapping("/profile")
	public ResponseEntity<BasicResponse> modifyProfile(@RequestBody UserDto userDto) throws Exception {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		userService.modifyUserProfile(userDto, authentication.getName());

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("회원 정보 수정 성공")
			.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "회원 탈퇴", description = "회원 탈퇴를 진행하며 탈퇴한 회원의 정보는 복구할 수 없습니다.")
	@DeleteMapping("/profile")
	public ResponseEntity<BasicResponse> withdrawal() throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		userService.withdrawal(authentication.getName());

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("회원 탈퇴 성공")
			.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "내 약혼자 확인", description = "나와 커플 관계인 약혼자를 확인합니다.")
	@GetMapping("/my-fiance")
	public ResponseEntity<BasicResponse> getMyFiance() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (authentication == null || authentication.getName() == null) {
			throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
		}

		User myFiance = userService.getMyFiance(authentication.getName());

		UserDto userDto = new UserDto(
			myFiance.getEmail(),
			myFiance.getName(),
			myFiance.getNickname(),
			myFiance.getPhoneNumber(),
			myFiance.getGender()
		);

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("내 약혼자 조회 성공")
			.count(1)
			.result(Collections.singletonList(userDto))
			.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Hidden
	@GetMapping("/jwt-test")
	public String jwtTest() {
		return "jwtTest 요청 성공";
	}

	@Hidden
	@GetMapping("/oauth2/sign-up")
	public String signUpForm() {
		return "임시 리다이렉트 페이지";
	}
}