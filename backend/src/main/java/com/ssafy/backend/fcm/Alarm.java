package com.ssafy.backend.fcm;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter
@AllArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue
    @Column(name = "alarm_id")
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
    private Long userId; //추가해야됨. 유저의 키와 ManyToOne 관계
    //User에는
//    @OneToMany(mappedBy = "userId")
//    private List<Alarm> alarms =new ArrayList<>();

    private Long scheduleId; //일정 수정 및 삭제 시 필요.

    private Date alarmDate; //일정마다 총 4 번의 알림. 일정 추가 시 알림 추가할 때 이용.

    private boolean readOrNot;

    private String type;

    public Alarm(){} //기본생성자
}
