package com.ssafy.backend.domain.couple;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.user.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Couple extends CreatedAndUpdatedBaseEntity {

	@Id
	@GeneratedValue
	@Column(name = "COUPLE_ID")
	private Long id;

	private LocalDate weddingDate;
	private String coupleCode;

	@OneToMany(mappedBy = "couple")
	private List<User> users = new ArrayList<>();

	@OneToMany(mappedBy = "couple")
	private List<Schedule> schedules = new ArrayList<>();
}
