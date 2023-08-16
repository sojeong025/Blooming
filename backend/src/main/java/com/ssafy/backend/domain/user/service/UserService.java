package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.diary.repository.DiaryRepository;
import com.ssafy.backend.domain.invitation.repository.InvitationRepository;
import com.ssafy.backend.domain.liked.repository.LikedRepository;
import com.ssafy.backend.domain.reservation.Reservation;
import com.ssafy.backend.domain.reservation.repository.ReservationRepository;
import com.ssafy.backend.domain.review.repository.ReviewRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.dto.CoupleCodeDto;
import com.ssafy.backend.domain.user.dto.UserDto;
import com.ssafy.backend.domain.user.dto.UserNotificationSettingDto;
import com.ssafy.backend.domain.user.dto.UserSignUpDto;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.wishlist.repository.WishlistRepository;
import com.ssafy.backend.domain.redis.fcm.FcmToken;
import com.ssafy.backend.domain.redis.fcm.FcmTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final FcmTokenRepository fcmTokenRepository;
    private final InvitationRepository invitationRepository;
    private final DiaryRepository diaryRepository;
    private final ReservationRepository reservationRepository;
    private final WishlistRepository wishlistRepository;
    private final ReviewRepository reviewRepository;
    private final LikedRepository likedRepository;

    @Transactional
    public void signUp(UserSignUpDto userSignUpDto, String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        findUser.updateFirst(userSignUpDto);
        findUser.authorizeUser();

        //fcm 토큰 redis 저장. 유저 key인 id로 저장
        if (userSignUpDto.getFcmToken() != null){ //null이 아닐 때만 저장
            fcmTokenRepository.save(new FcmToken(String.valueOf(findUser.getId()), userSignUpDto.getFcmToken()));
        }

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
        Couple originCouple = coupleRepository.findByCoupleCode(findUser.getCouple().getCoupleCode())
                .orElseThrow(() -> new IllegalArgumentException("커플코드가 없는 회원입니다. 잘못된 회원!"));

        findUser.removeCouple();
        // userId를 참조하는 테이블의 데이터 삭제
        diaryRepository.deleteAllByUserId(findUser.getId());
        List<Reservation> reservations = findUser.getReservations();
        reservationRepository.deleteAll(reservations);
        wishlistRepository.deleteAllByUserId(findUser.getId());
        likedRepository.deleteAllByUserId(findUser.getId()); // 내가 단 도움돼요 삭제
        likedRepository.deleteLikeByUser(findUser); // 내 후기에 달린 도움돼요 삭제
        reviewRepository.deleteAllByUserId(findUser.getId());


        log.debug(originCouple.getUsers().toString());

        if (originCouple.getUsers().isEmpty() && originCouple.getInvitation() != null) {
            // TODO: 커플 관련 삭제 분리해야하지 않을까?
            originCouple.getInvitation().setCouple(null);
            invitationRepository.delete(originCouple.getInvitation());
            coupleRepository.delete(originCouple);
        }

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
                user.getProfileImage(),
                user.getEmail(),
                user.getName(),
                user.getNickname(),
                user.getPhoneNumber(),
                user.getGender(),
                user.getCouple().getCoupleCode()
        );
    }

    public void certificationCouple(CoupleCodeDto coupleCodeDto) {
        Couple couple = coupleRepository.findByCoupleCode(coupleCodeDto.getCoupleCode())
            .orElseThrow(() -> new IllegalArgumentException("입력한 커플 코드에 맞는 커플이 없습니다."));

        if (couple.getUsers().size() >= 2) {
            throw new IllegalArgumentException("이미 커플 연결이 완료된 사용자입니다.");
        }

        User findUser = couple.getUsers().get(0);
        // 찾은 유저가 내 약혼자 이름과 다르다면 예외처리
        if (!(findUser.getName().equals(coupleCodeDto.getName()))) {
            throw new IllegalArgumentException("커플 연결할 수 없는 코드입니다.");
        }
    }

    @Transactional
    public void updateCouple(CoupleCodeDto coupleCodeDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        Couple couple = coupleRepository.findByCoupleCode(coupleCodeDto.getCoupleCode())
                .orElseThrow(() -> new IllegalArgumentException("정상적인 커플코드가 아닙니다."));
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        Couple originCouple = coupleRepository.findByCoupleCode(user.getCouple().getCoupleCode())
                .orElseThrow(() -> new IllegalArgumentException("커플코드가 없는 회원입니다. 잘못된 회원!"));

        user.removeCouple();

        if (originCouple.getUsers().isEmpty() && originCouple.getInvitation() != null) {
            // TODO: 커플 관련 삭제 분리해야하지 않을까?
            originCouple.getInvitation().setCouple(null);
            invitationRepository.delete(originCouple.getInvitation());
            coupleRepository.delete(originCouple);
        }

        // 상대방 커플 코드의 커플을 연결
        user.setCouple(couple);
    }

    // 유저 푸시알림 설정 api
    public UserNotificationSettingDto getNotificationSetting(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        return new UserNotificationSettingDto(user.getNotificationSetting());
    }

    @Transactional
    public void agreeNotificationSetting(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        user.agreeNotification();
    }


    @Transactional
    public void disagreeNotificationSetting(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        user.disagreeNotification();
    }

}
