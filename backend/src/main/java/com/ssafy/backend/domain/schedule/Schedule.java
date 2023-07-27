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

import com.ssafy.backend.domain.schedule.dto.ScheduleModifyDto;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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
	private String content;
	@Column(name = "SCHEDULED_DATE")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate scheduleDate;
	@Column(name = "SCHEDULED_TIME")
	@DateTimeFormat(pattern = "kk:mm:ss")
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

	public void update(ScheduleModifyDto scheduleModifyDto){
		//변경 가능한 것 : title, content, scheduleTime
		this.title = scheduleModifyDto.getTitle();
		this.content = scheduleModifyDto.getContent();
		this.scheduleTime = scheduleModifyDto.getScheduleTime();
	}

	public Schedule(String title, String content, LocalDate scheduleDate, LocalTime scheduleTime, ScheduledBy scheduledBy) {
		this.title = title;
		this.content = content;
		this.scheduleDate = scheduleDate;
		this.scheduleTime = scheduleTime;
		this.scheduledBy = scheduledBy;
	}
}
