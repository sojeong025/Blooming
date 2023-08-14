package com.ssafy.backend.domain.couple;

import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.invitation.Invitation;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

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
    private String coupleCode;

    @OneToMany(mappedBy = "couple", fetch = FetchType.EAGER)
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "couple", cascade = CascadeType.ALL)
    private List<Schedule> schedules = new ArrayList<>();

    @OneToOne(mappedBy = "couple", fetch = LAZY)
    private Invitation invitation;

    public void setCoupleCode(String coupleCode) {
        this.coupleCode = coupleCode;
    }

    public static Couple createCouple() {
        Couple couple = new Couple();
        String coupleCode = couple.generateCoupleCode();
        couple.setCoupleCode(coupleCode);
        return couple;
    }

    public String generateCoupleCode() {
        SecureRandom random = new SecureRandom();
        int randomNumber = random.nextInt(100000000);
        DecimalFormat format = new DecimalFormat("00000000");

        return format.format(randomNumber);
    }

    public void changeWeddingDate(LocalDate weddingDate) {
        this.weddingDate = weddingDate;
    }
}
