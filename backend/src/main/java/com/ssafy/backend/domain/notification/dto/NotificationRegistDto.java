package com.ssafy.backend.domain.notification.dto;

import com.ssafy.backend.domain.notification.NotificationType;
import com.ssafy.backend.domain.notification.ReadStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
public class NotificationRegistDto {

    private ReadStatus readStatus;
    private NotificationType notificationType;
    //알림 로그를 위해 추가
    private String title;
    private String content;
    private Long userId;
}
