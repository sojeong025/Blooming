package com.ssafy.backend.domain.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@AllArgsConstructor
public class InvitationResultDto {
    private Long id;

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

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @DateTimeFormat(pattern = "HH:mm")
    private LocalTime time;
}
