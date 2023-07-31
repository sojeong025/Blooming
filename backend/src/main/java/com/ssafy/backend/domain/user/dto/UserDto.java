package com.ssafy.backend.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserDto {
	private String name;
	private String nickname;
	private String phoneNumber;
	private String gender;
}
