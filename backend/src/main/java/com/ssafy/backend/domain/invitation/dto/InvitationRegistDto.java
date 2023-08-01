package com.ssafy.backend.domain.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
public class InvitationRegistDto {

    //이미지 - 일단 string으로 저장
    private String thumbnail;

    //신랑 부모님
    private String groomFatherName;
    private String groomFatherPhone;
    private String groomMotherName;
    private String groomMotherPhone;

    //신부 부모님
    private String brideFatherName;
    private String brideFatherPhone;
    private String brideMotherName;
    private String brideMotherPhone;

    //모시는 글
    private String title;
    private String content;
    private String weddingHallName;
    private String floor;
    private String address; //일단

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateTime;
}
