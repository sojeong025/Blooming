package com.ssafy.backend.domain.schedule;

import com.ssafy.backend.domain.common.CreatedBaseEntity;
import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.schedule.dto.ScheduleModifyDto;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Schedule extends CreatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "SCHEDULE_ID")
    private Long id;

    private String title;
    private String content;
    @Column(name = "SCHEDULED_DATE")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate scheduleDate;
    @Column(name = "SCHEDULED_TIME")
    @DateTimeFormat(pattern = "kk:mm:ss")
    private LocalTime scheduleTime;
    @Enumerated(EnumType.STRING)
    private ScheduledBy scheduledBy;
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    //==연관관계 메서드==//
    // 양방향 세팅 시 객체의 데이터 무결성 보장
    public void setCouple(Couple couple) {
        this.couple = couple;
        couple.getSchedules().add(this);
    }

    public void update(ScheduleModifyDto scheduleModifyDto) {
        //변경 가능한 것 : title, content, scheduleTime
        this.title = scheduleModifyDto.getTitle();
        this.content = scheduleModifyDto.getContent();
        this.scheduleTime = scheduleModifyDto.getScheduleTime();
    }

    public Schedule(String title, String content, LocalDate scheduleDate, LocalTime scheduleTime, ScheduledBy scheduledBy, Category category) {
        this.title = title;
        this.content = content;
        this.scheduleDate = scheduleDate;
        this.scheduleTime = scheduleTime;
        this.scheduledBy = scheduledBy;
        this.category = category;
    }
}
