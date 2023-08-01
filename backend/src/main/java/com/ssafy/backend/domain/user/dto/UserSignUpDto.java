package com.ssafy.backend.domain.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserSignUpDto {
    private String name;
    private String nickname;
    private String phoneNumber;
    private String gender;
    private String coupleCode;
}
