package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;

    @Transactional
    public void signUp(UserSignUpDto userSignUpDto, String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        findUser.updateFirst(userSignUpDto);
        findUser.authorizeUser();

        // TODO: coupleCode 검증하는 api를 하나 만들자.(프론트에서 인증버튼이 있으니까..) 그러면 null이 아닐 때 무조건 setCouple하면 된다.
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

    public User getUserProfile(String userEmail) {
        return userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
    }

    @Transactional
    public void modifyUserProfile(UserDto userDto, String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        findUser.updateProfile(userDto);
    }

    @Transactional
    public void withdrawal(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        userRepository.delete(findUser);
    }

    public UserDto getMyFiance(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        User user = userRepository.findUserByCouple(findUser.getCouple(), findUser.getId())
            .orElse(null);

        if (user == null) {
            return null;
        }

        return new UserDto(
            user.getEmail(),
            user.getName(),
            user.getNickname(),
            user.getPhoneNumber(),
            user.getGender(),
            user.getCouple().getCoupleCode()
        );
    }
}
