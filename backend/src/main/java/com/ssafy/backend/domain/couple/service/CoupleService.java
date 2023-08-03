package com.ssafy.backend.domain.couple.service;

import com.ssafy.backend.domain.couple.dto.WeddingDateDto;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleService {

    private final UserRepository userRepository;

    @Transactional
    public void registerWeddingDate(WeddingDateDto weddingDateDto, String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        LocalDate weddingDate = weddingDateDto.getWeddingDate();
        findUser.getCouple().changeWeddingDate(weddingDate);
    }

    public WeddingDateDto getWeddingDate(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        LocalDate weddingDate = findUser.getCouple().getWeddingDate();
		return new WeddingDateDto(weddingDate);
    }
}
