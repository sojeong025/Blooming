package com.ssafy.backend.fcm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@AllArgsConstructor
public class Schedule {

    @Id @GeneratedValue
    @Column(name = "schedule_id")
    private Long id;

    //커플 테이블과 다대일
    private Long coupleId;

    private String title;
    private LocalDateTime scheduleAt; //타임스탬프..
    private String category;

    public Schedule() {}
}
