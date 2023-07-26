package com.ssafy.backend.domain.common;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public abstract class CreatedBaseEntity {

	@CreatedDate
	@Column(name = "CREATED_AT")
	private LocalDateTime createdDate;

	public CreatedBaseEntity(LocalDateTime createdDate) {
		this.createdDate = createdDate;
	}
}
