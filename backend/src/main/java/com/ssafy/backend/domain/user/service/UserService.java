package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CoupleRepository coupleRepository;

    public void signUp(UserSignUpDto userSignUpDto, String userEmail) throws Exception {

//        if (userRepository.findByEmail(userSignUpDto.getEmail()).isPresent()) {
//            throw new Exception("이미 존재하는 이메일입니다.");
//        }

//        if (userRepository.findByNickname(userSignUpDto.getNickname()).isPresent()) {
//            throw new Exception("이미 존재하는 닉네임입니다.");
//        }
        User findUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        findUser.update(userSignUpDto);
        findUser.authorizeUser();

        String coupleCode = "123ABCabc";// TODO: 커플코드 생성 함수 만들기
        Couple couple = Couple.builder()
            .coupleCode(coupleCode)
            .build();

        findUser.setCouple(couple);
        coupleRepository.save(couple);

        //        User user = User.builder()
//                .email(userSignUpDto.getEmail())
//                .password(userSignUpDto.getPassword())
//                .name(userSignUpDto.getName())
//                .nickname(userSignUpDto.getNickname())
//                .phoneNumber(userSignUpDto.getPhoneNumber())
//                .gender(userSignUpDto.getGender())
//                .role(Role.USER)
//                .build();
//
//        user.passwordEncode(passwordEncoder);
//        userRepository.save(user);
    }
}
