package com.ssafy.backend.global.redis;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchHistoryRegistDto {
    private String key;
    private String value;

    @Override
    public String toString() {
        return "SearchHistoryRegistDto{" +
                "key='" + key + '\'' +
                ", value='" + value + '\'' +
                '}';
    }
}
