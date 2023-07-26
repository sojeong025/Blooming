package com.ssafy.backend.domain.schedule;

import static javax.persistence.FetchType.*;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.ssafy.backend.domain.common.CreatedBaseEntity;
import com.ssafy.backend.domain.couple.Couple;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Schedule extends CreatedBaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "SCHEDULE_ID")
	private Long id;

	private String title;
	@Column(name = "SCHEDULED_DATE")
	private LocalDate scheduleDate;
	@Column(name = "SCHEDULED_TIME")
	private LocalTime scheduleTime;
	@Enumerated(EnumType.STRING)
	private ScheduledBy scheduledBy;

	@ManyToOne(fetch = LAZY)
	@JoinColumn(name = "COUPLE_ID")
	private Couple couple;

	//==연관관계 메서드==//
	// 양방향 세팅 시 객체의 데이터 무결성 보장
	public void setCouple(Couple couple) {
		this.couple = couple;
		couple.getSchedules().add(this);
	}
}
