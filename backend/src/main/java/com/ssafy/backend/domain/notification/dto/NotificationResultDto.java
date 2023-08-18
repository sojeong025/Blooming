package com.ssafy.backend.domain.notification.dto;

import com.ssafy.backend.domain.notification.NotificationType;
import com.ssafy.backend.domain.notification.ReadStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class NotificationResultDto {

    private Long id;
    private ReadStatus readStatus;
    private NotificationType notificationType;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
