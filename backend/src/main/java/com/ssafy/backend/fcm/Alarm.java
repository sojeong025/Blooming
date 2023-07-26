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

    private boolean readOrNot;

    private String type;

    public Alarm(){} //기본생성자
}
