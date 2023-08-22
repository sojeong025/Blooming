package com.ssafy.backend.domain.couple.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.dto.WeddingDateDto;
import com.ssafy.backend.domain.tipBox.TipCode;
import com.ssafy.backend.domain.tipBox.repository.TipCodeRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.fcm.FCMNotificationRequestDto;
import com.ssafy.backend.global.fcm.NotificationScheduler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleService {

    private final UserRepository userRepository;
    private final TipCodeRepository tipCodeRepository;
    private final NotificationScheduler notificationScheduler;

    @Transactional
    public void registerWeddingDate(WeddingDateDto weddingDateDto, String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        LocalDate weddingDate = weddingDateDto.getWeddingDate();
        findUser.getCouple().changeWeddingDate(weddingDate);
        Couple couple = findUser.getCouple();
        // 날짜 바꾸고 알림 보내주기
        List<TipCode> tipCodeList = tipCodeRepository.findAll();
        for (TipCode tipCode : tipCodeList) {
            int day = tipCode.getLeftDay();
            System.out.println("D-Day" + day + "일 후 알림");
            System.out.println("커플 WEDDING DATE = "+couple.getWeddingDate());
            System.out.println("TIPCODE WEDDIMG DATE = "+LocalDate.now().plusDays(day));
            System.out.println(" IF 결과"+(couple.getWeddingDate().isEqual(LocalDate.now().plusDays(day))));

            //day일 후 체크리스트 일단 읽어옴 -> 푸시 알림 보내기 + 알림 로그 테이블에 저장
            if(couple.getWeddingDate().isEqual(LocalDate.now().plusDays(day))){
                //커플 아이디에 해당하는 유저 두 명을 찾는다. 남자는 신랑, 여자는 신부로 매핑한다.
                User groom = null;
                User bride = null;
                List<User> users = couple.getUsers();
                for (User user : users) {
                    if (user.getGender().equals("MALE")) {
                        groom = user;
                    } else if (user.getGender().equals("FEMALE")) {
                        bride = user;
                    }
                }

                //스케쥴 타입에 따라 다르게 알림 내용 처리
                String contentGroom = "";
                String contentBride = "";

                String titleGroom = "";
                String titleBride = "";
                //null 참조 방지를 위해 닉네임 미리 받기
                String groomNickname = (groom != null) ? groom.getNickname() : "예비신랑";
                String brideNickname = (bride != null) ? bride.getNickname() : "예비신부";

                // 체크리스트 타입에 따라 다르게 알림 내용 처리
                if (day == 0) {
                    titleGroom = groomNickname + "님의 결혼을 축하해요";
                    titleBride = brideNickname + "님의 결혼을 축하해요";

                } else {
                    titleGroom = "결혼식까지" + day + "일 남았어요";
                    titleBride = "결혼식까지" + day + "일 남았어요";
                }


                if (day == 0) {
                    contentGroom = "두 분의 앞날이 더욱 행복하길 바래요❤";
                    contentBride = "두 분의 앞날이 더욱 행복하길 바래요❤";
                } else {
                    contentGroom = groomNickname + "님 " + tipCode.getTitle() + " 하셔야 해요. 지금 준비하러 가볼까요?";
                    contentBride = brideNickname + "님 " + tipCode.getTitle() + " 하셔야 해요. 지금 준비하러 가볼까요?";
                }

                //처리한 내용을 알림 전송(신랑, 신부)
                log.info(notificationScheduler.sendNotificationByToken(new FCMNotificationRequestDto(groom, titleGroom, contentGroom)));
                log.info(notificationScheduler.sendNotificationByToken(new FCMNotificationRequestDto(bride, titleBride, contentBride)));

            }

        }

    }

    public WeddingDateDto getWeddingDate(String userEmail) {
        User findUser = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        LocalDate weddingDate = findUser.getCouple().getWeddingDate();
		return new WeddingDateDto(weddingDate);
    }
}
