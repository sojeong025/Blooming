package com.ssafy.backend.domain.couple;

import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Couple extends CreatedAndUpdatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "COUPLE_ID")
    private Long id;

    private LocalDate weddingDate;
    private int coupleCode;

    @OneToMany(mappedBy = "couple", fetch = FetchType.EAGER)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "couple")
    private List<Schedule> schedules = new ArrayList<>();

    public void setCoupleCode(int coupleCode) {
        this.coupleCode = coupleCode;
    }

    public static Couple createCouple() {
        Couple couple = new Couple();
        int coupleCode = couple.generateCoupleCode();
        couple.setCoupleCode(coupleCode);
        return couple;
    }

    public int generateCoupleCode() {
        SecureRandom random = new SecureRandom();
        return random.nextInt(100000000);
    }

    public void changeWeddingDate(LocalDate weddingDate) {
        this.weddingDate = weddingDate;
    }
}
