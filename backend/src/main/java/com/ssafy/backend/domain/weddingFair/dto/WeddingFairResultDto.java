package com.ssafy.backend.domain.weddingFair.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class WeddingFairResultDto {

    private String thumbnail;
    private String name;
    private String datetime;
    private String place;
    private String link;
}
