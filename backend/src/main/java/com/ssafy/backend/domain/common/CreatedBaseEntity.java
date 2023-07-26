package com.ssafy.backend.domain.common;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public abstract class CreatedBaseEntity {

	@CreatedDate
	@Column(name = "CREATED_AT")
	private LocalDateTime createdDate;

	public CreatedBaseEntity(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
}
