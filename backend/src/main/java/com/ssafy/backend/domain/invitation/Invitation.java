package com.ssafy.backend.domain.invitation;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.invitation.dto.InvitationRegistDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Invitation {

    @Id
    @GeneratedValue
    @Column(name = "INVITATION_ID")
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

    //맞나
    @OneToOne(fetch = LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    //==연관관계 메서드==//
    // 양방향 세팅 시 객체의 데이터 무결성 보장
    public void setCouple(Couple couple) {
        this.couple = couple;
        couple.setInvitation(this);
    }

    public Invitation(String thumbnail, String groomFatherName, String groomFatherPhone, String groomMotherName, String groomMotherPhone, String brideFatherName, String brideFatherPhone, String brideMotherName, String brideMotherPhone, String title, String content, String weddingHallName, String floor, String address, LocalDate date, LocalTime time) {
        this.thumbnail = thumbnail;
        this.groomFatherName = groomFatherName;
        this.groomFatherPhone = groomFatherPhone;
        this.groomMotherName = groomMotherName;
        this.groomMotherPhone = groomMotherPhone;
        this.brideFatherName = brideFatherName;
        this.brideFatherPhone = brideFatherPhone;
        this.brideMotherName = brideMotherName;
        this.brideMotherPhone = brideMotherPhone;
        this.title = title;
        this.content = content;
        this.weddingHallName = weddingHallName;
        this.floor = floor;
        this.address = address;
        this.date = date;
        this.time = time;
    }

    public Invitation() {
    }

    public void update(InvitationRegistDto invitationRegistDto) {
        this.thumbnail = invitationRegistDto.getThumbnail();
        this.groomFatherName = invitationRegistDto.getGroomFatherName();
        this.groomFatherPhone = invitationRegistDto.getGroomFatherPhone();
        this.groomMotherName = invitationRegistDto.getGroomMotherName();
        this.groomMotherPhone = invitationRegistDto.getGroomMotherPhone();
        this.brideFatherName = invitationRegistDto.getBrideFatherName();
        this.brideFatherPhone = invitationRegistDto.getBrideFatherPhone();
        this.brideMotherName = invitationRegistDto.getBrideMotherName();
        this.brideMotherPhone = invitationRegistDto.getBrideMotherPhone();
        this.title = invitationRegistDto.getTitle();
        this.content = invitationRegistDto.getContent();
        this.weddingHallName = invitationRegistDto.getWeddingHallName();
        this.floor = invitationRegistDto.getFloor();
        this.address = invitationRegistDto.getAddress();
        this.date = invitationRegistDto.getDate();
        this.time = invitationRegistDto.getTime();
    }
}
