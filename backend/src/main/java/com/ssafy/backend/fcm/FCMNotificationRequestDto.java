package com.ssafy.backend.fcm;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
public class FCMNotificationRequestDto {
    private Long targetUserId;
    private String title;
    private String body;
}
