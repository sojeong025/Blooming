package com.ssafy.backend.domain.user.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final CoupleRepository coupleRepository;

	public void signUp(UserSignUpDto userSignUpDto, String userEmail) throws Exception {
		User findUser = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

		findUser.update(userSignUpDto);
		findUser.authorizeUser();

		if (userSignUpDto.getCoupleCode() == null) {
			Couple couple = Couple.createCouple();

			findUser.setCouple(couple);
			coupleRepository.save(couple);
		} else {
			Couple couple = coupleRepository.findByCoupleCode(userSignUpDto.getCoupleCode())
				.orElseThrow(() -> new IllegalArgumentException("입력한 커플 코드에 맞는 커플이 없습니다."));

			findUser.setCouple(couple);
		}
	}
}
