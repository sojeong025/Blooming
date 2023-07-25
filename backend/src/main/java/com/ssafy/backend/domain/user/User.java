package com.ssafy.backend.domain.user;

import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Builder
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phoneNumber;
    private String gender;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String socialId;

    @Column(length = 500)
    private String refreshToken; // 리프레시 토큰

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
    }

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    //== 유저 필드 업데이트 ==//
    public void update(UserSignUpDto userSignUpDto) {
        this.email = userSignUpDto.getEmail();
        this.name = userSignUpDto.getName();
        this.nickname = userSignUpDto.getNickname();
        this.phoneNumber = userSignUpDto.getPhoneNumber();
        this.gender = userSignUpDto.getGender();
    }

    public void updateNickname(String updateNickname) {
        this.nickname = updateNickname;
    }

    public void updatePhoneNumber(String updatePhoneNumber) {
        this.phoneNumber = updatePhoneNumber;
    }

    public void updateGender(String updateGender) {
        this.gender = updateGender;
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", nickname='" + nickname + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", role=" + role +
                ", socialId='" + socialId + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
