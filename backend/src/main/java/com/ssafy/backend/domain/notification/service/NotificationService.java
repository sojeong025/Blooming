package com.ssafy.backend.domain.notification.service;

import com.ssafy.backend.domain.notification.Notification;
import com.ssafy.backend.domain.notification.ReadStatus;
import com.ssafy.backend.domain.notification.dto.NotificationRegistDto;
import com.ssafy.backend.domain.notification.dto.NotificationResultDto;
import com.ssafy.backend.domain.notification.repository.NotificationRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.engine.jdbc.env.internal.NormalizingIdentifierHelperImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;


    public int registNotification(NotificationRegistDto notificationRegistDto) {
        Notification notification = new Notification(
                notificationRegistDto.getReadStatus(),
                notificationRegistDto.getNotificationType(),
                notificationRegistDto.getTitle(),
                notificationRegistDto.getContent()
        );
        //유저 등록 - dto를 통해 받은 유저를 등록
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        User user = userRepository.findByEmail(authentication.getName())
//                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        User user = userRepository.findById(notificationRegistDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 아이디에 해당하는 회원이 없습니다."));
        notification.setUser(user);

        //일정 등록
        notificationRepository.save(notification);

        return 1;
    }

    public List<NotificationResultDto> getAllNotification(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        //유저의 notification 얻기
        List<Notification> notifications = notificationRepository.findByUserOrderByIdDesc(user, pageable);
        //결과값도 dto로 바꿔주기
        List<NotificationResultDto> result = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationResultDto notificationResultDto = new NotificationResultDto(
                    notification.getId(),
                    notification.getReadStatus(),
                    notification.getNotificationType(),
                    notification.getTitle(),
                    notification.getContent(),
                    notification.getCreatedDate()
            );
            result.add(notificationResultDto);
        }
        return result;
    }

    public int modifyNotification(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("아이디에 해당하는 알림이 없습니다."));
        notification.updateReadStatus();
        return 1;
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }


    public void deleteAllNotification() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        notificationRepository.deleteAllByUserId(user.getId());
    }

    public int getUnreadCnt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        List<Notification> notifications = notificationRepository.findByUserAndReadStatus(user, ReadStatus.UNREAD);
        return notifications.size();
    }
}
