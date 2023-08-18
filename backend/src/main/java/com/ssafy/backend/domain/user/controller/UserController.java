package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.*;
import com.ssafy.backend.domain.user.repository.UserRepository;
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

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;

@Tag(name = "회원 API", description = "카카오톡 로그인 회원 API")
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
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
                userProfile.getProfileImage(),
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
        headers.add("Authorization_refresh", "Bearer " + refreshToken);

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

    // 푸시 알림 동으 api 작성 get / post / delete
    @Operation(summary = "내 알림동의 얻기", description = "나의 푸시알림 설정을 얻습니다.")
    @GetMapping("/notification-setting")
    public ResponseEntity<BasicResponse> getNotificationSetting() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        UserNotificationSettingDto userNotificationSettingDto = userService.getNotificationSetting(authentication.getName());

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("내 푸시알림 설정 조회 성공")
                .count(1)
                .result(Collections.singletonList(userNotificationSettingDto))
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "푸시알림 동의", description = "푸시 알림을 받습니다.")
    @PostMapping("/notification-setting")
    public ResponseEntity<BasicResponse> agreeNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        userService.agreeNotificationSetting(authentication.getName());

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("푸시 알림 설정 동의 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }
    @Operation(summary = "푸시알림 거절", description = "푸시 알림을 받지 않습니다.")
    @DeleteMapping("/notification-setting")
    public ResponseEntity<BasicResponse> disagreeNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        userService.disagreeNotificationSetting(authentication.getName());

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("푸시 알림 설정 거절 성공")
                .build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Hidden
    @GetMapping("/auto-login")
    public ResponseEntity<BasicResponse> autoLogin(HttpServletRequest request) {
        String refreshToken = jwtService.extractRefreshToken(request)
                .orElseThrow(() -> new IllegalArgumentException("refresh 토큰이 없습니다."));
        User findUser = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("일치하는 사용자 정보가 없습니다."));

        String reissueAccessToken = jwtService.createAccessToken(findUser.getEmail());
        String reissueRefreshToken = jwtService.createRefreshToken();

        // 헤더에 토큰 정보 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + reissueAccessToken);
        headers.add("Authorization_refresh", "Bearer " + reissueRefreshToken);

        jwtService.updateRefreshToken(findUser.getEmail(), reissueRefreshToken);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("자동로그인을 위한 api라 아무 의미없다~")
                .build();

        return new ResponseEntity<>(basicResponse, headers, basicResponse.getHttpStatus());
    }

    @Hidden
    @GetMapping("/oauth2/sign-up")
    public String signUpForm() {
        return "임시 리다이렉트 페이지";
    }
}