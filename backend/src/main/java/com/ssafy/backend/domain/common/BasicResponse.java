package com.ssafy.backend.domain.common;

import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasicResponse {

	private Integer code; // http 상태코드명(OK, NOT FOUND)
	private HttpStatus httpStatus; // http 상태코드번호(200, 404)
	private String message; // response 정보 (사용자 조회 성공)
	private Integer count; // 반환 개수
	private List<Object> result; // 실제 response 데이터
}
