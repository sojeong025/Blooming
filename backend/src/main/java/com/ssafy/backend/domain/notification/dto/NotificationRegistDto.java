package com.ssafy.backend.domain.notification.dto;

import com.ssafy.backend.domain.notification.NotificationType;
import com.ssafy.backend.domain.notification.ReadStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class NotificationRegistDto {

    private ReadStatus readStatus;
    private NotificationType notificationType;
}
