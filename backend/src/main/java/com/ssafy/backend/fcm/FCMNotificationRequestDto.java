package com.ssafy.backend.fcm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FCMNotificationRequestDto {
    private Long targetUserId;
    private String title;
    private String body;
}
