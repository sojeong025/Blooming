package com.ssafy.backend.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserDto {
	private String email;
	private String nickname;
	private String gender;
}
