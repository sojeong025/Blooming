package com.ssafy.backend.domain.tipMagazine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TipMagazineListDto {

    private Long id;
    private String title;
    private String thumbnail;
}
