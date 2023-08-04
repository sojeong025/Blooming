package com.ssafy.backend.fcm;

import com.ssafy.backend.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class FCMNotificationRequestDto {
    private User user;
    private String title;
    private String body;
}
