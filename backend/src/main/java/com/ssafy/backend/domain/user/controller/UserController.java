package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.CoupleCodeDto;
import com.ssafy.backend.domain.user.dto.KakaoUserDto;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.jwt.service.JwtService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Tag(name = "회원 API", description = "카카오톡 로그인 회원 API")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    @Operation(summary = "카카오 회원 정보 가져오기", description = "카카오톡에서 제공하는 회원 정보를 가지고 와서 추가 정보칸에 제공하기 위한 API입니다.")
    @GetMapping("/kakao-profile")
    public ResponseEntity<BasicResponse> getKakaoProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        User userProfile = userService.getUserProfile(authentication.getName());

        KakaoUserDto kakaoUserDto = new KakaoUserDto(
            userProfile.getEmail(),
            userProfile.getNickname(),
            userProfile.getGender()
        );

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("카카오에서 받은 유저 정보 조회 성공")
            .count(1)
            .result(Collections.singletonList(kakaoUserDto))
            .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "내 정보 조회", description = "회원가입 시 입력한 내 정보를 조회합니다.")
    @GetMapping("/profile")
    public ResponseEntity<BasicResponse> getProfile() {

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
            userProfile.getGender(),
            userProfile.getCouple().getCoupleCode()
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

    @Operation(summary = "커플 코드 인증", description = "추가 정보 입력 시 커플 코드가 있을 시 생성되어있는 커플이 있는 지 인증합니다.")
    @Parameter(name = "userSignDto", description = "회원가입이 추가로 필요한 개인정보 Dto")
    @PostMapping("/couple-certification")
    public ResponseEntity<BasicResponse> certificationCouple(@RequestBody CoupleCodeDto coupleCodeDto) {
        userService.certificationCouple(coupleCodeDto);

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("커플 인증 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "추가 정보 받기", description = "카카오톡 로그인 후 필요한 개인정보를 입력받습니다.")
    @Parameter(name = "userSignDto", description = "회원가입이 추가로 필요한 개인정보 Dto")
    @PostMapping("/sign-up")
    public ResponseEntity<BasicResponse> signUp(@RequestBody UserSignUpDto userSignUpDto) {


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println(userSignUpDto.getFcmToken());
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");


        userService.signUp(userSignUpDto, authentication.getName());

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("회원 가입 성공").build();

        String accessToken = jwtService.createAccessToken(authentication.getName());
        String refreshToken = jwtService.createRefreshToken();

        // 헤더에 토큰 정보 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Authorization_refresh", refreshToken);

        jwtService.updateRefreshToken(authentication.getName(), refreshToken);

        return new ResponseEntity<>(basicResponse, headers, basicResponse.getHttpStatus());
    }

    @Operation(summary = "내 정보 수정", description = "조회된 내 정보를 수정합니다.")
    @Parameter(name = "userDto", description = "내 정보 수정을 위한 Dto")
    @PutMapping("/profile")
    public ResponseEntity<BasicResponse> modifyProfile(@RequestBody UserDto userDto) {

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
    public ResponseEntity<BasicResponse> withdrawal() {
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

        UserDto myFiance = userService.getMyFiance(authentication.getName());

        if (myFiance == null) {
            BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.NO_CONTENT.value())
                .httpStatus(HttpStatus.NO_CONTENT)
                .message("내 약혼자가 없습니다.")
                .build();

            return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
        }

        BasicResponse basicResponse = BasicResponse.builder()
            .code(HttpStatus.OK.value())
            .httpStatus(HttpStatus.OK)
            .message("내 약혼자 조회 성공")
            .count(1)
            .result(Collections.singletonList(myFiance))
            .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "상대방 커플코드로 연결", description = "회원가입 후 상대방의 커플코드로 커플 연결 시 사용하는 API")
    @Parameter(name = "coupleCodeDto", description = "상대방의 이름, 상대방 커플 코드를 입력하는 dto")
    @PutMapping("/couple")
    public ResponseEntity<BasicResponse> modifyProfile(@RequestBody CoupleCodeDto coupleCodeDto) {
        userService.updateCouple(coupleCodeDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("커플 연결 성공")
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