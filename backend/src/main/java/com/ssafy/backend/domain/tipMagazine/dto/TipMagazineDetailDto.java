package com.ssafy.backend.domain.tipMagazine.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TipMagazineDetailDto {
    private String title;
    private String thumbnail;
    private String intro;

    private String subTitle1;
    private String subImage1;
    private String subContent1;

    private String subTitle2;
    private String subImage2;
    private String subContent2;

    private String subTitle3;
    private String subImage3;
    private String subContent3;

    private String subTitle4;
    private String subImage4;
    private String subContent4;

    private String outro;
}
