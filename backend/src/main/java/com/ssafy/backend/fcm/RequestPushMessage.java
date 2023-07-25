package com.ssafy.backend.fcm;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RequestPushMessage {
    MORNING_DIET("아침 식사 드셨나요?", "아침 식사를 드셨다면, 식사를 기록해주세요!"),
    LUNCH_DIET("아침 식사 드셨나요?", "아침 식사를 드셨다면, 식사를 기록해주세요!"),
    DINER_DIET("아침 식사 드셨나요?", "아침 식사를 드셨다면, 식사를 기록해주세요!");

    String title;
    String body;
}
