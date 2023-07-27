package com.ssafy.backend.domain.couple;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
	private int coupleCode;

	@OneToMany(mappedBy = "couple")
	private List<User> users = new ArrayList<>();

	@OneToMany(mappedBy = "couple")
	private List<Schedule> schedules = new ArrayList<>();

	public void setCoupleCode(int coupleCode) {
		this.coupleCode = coupleCode;
	}
	public static Couple createCouple() {
		Couple couple = new Couple();
		int coupleCode = couple.generateCoupleCode();
		couple.setCoupleCode(coupleCode);
		System.out.println("coupleCode = " + coupleCode);
		return couple;
	}

	public int generateCoupleCode() {
		SecureRandom random = new SecureRandom();
		return random.nextInt(100000000);
	}

	public void changeWeddingDate(LocalDate weddingDate) {
		this.weddingDate = weddingDate;
	}
}
