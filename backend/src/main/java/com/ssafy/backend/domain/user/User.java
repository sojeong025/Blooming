package com.ssafy.backend.domain.user;

import static javax.persistence.FetchType.*;

import java.util.ArrayList;
import java.util.List;

import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.notification.Notification;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends CreatedAndUpdatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
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
    private String refreshToken;

    private String fcmToken;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    //==연관관계 메서드==//
    // 양방향 세팅 시 객체의 데이터 무결성 보장
    public void setCouple(Couple couple) {
        this.couple = couple;
        couple.getUsers().add(this);
    }

    //==생성 메서드==//
    // TODO: 생성메서드 만들기


    //== 유저 필드 업데이트 ==//
    public void update(UserSignUpDto userSignUpDto) {
        this.email = userSignUpDto.getEmail();
        this.name = userSignUpDto.getName();
        this.nickname = userSignUpDto.getNickname();
        this.phoneNumber = userSignUpDto.getPhoneNumber();
        this.gender = userSignUpDto.getGender();
    }

    // 유저 권한 설정 메소드
    public void authorizeUser() {
        this.role = Role.USER;
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

    // 비밀번호 암호화 메소드
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
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
