package com.ssafy.backend.domain.tipMagazine;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class TipMagazine {

    @Id
    @GeneratedValue
    @Column(name = "tip_magazine_id")
    private Long id;

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
