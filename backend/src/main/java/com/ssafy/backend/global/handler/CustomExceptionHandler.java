package com.ssafy.backend.global.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.ssafy.backend.domain.invitation.exception.InvitationNotFoundException;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {
	@ExceptionHandler(InvitationNotFoundException.class)
	protected ResponseEntity<Object> handleInvitationNotFoundException(InvitationNotFoundException ex) {
		// 클라이언트에게 에러 코드와 메시지를 전달
		String error = "만든 청첩장이 없습니다.";
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
	}
}
