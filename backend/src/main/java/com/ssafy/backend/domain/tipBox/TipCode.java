package com.ssafy.backend.domain.tipBox;

import lombok.*;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TipCode {
    @Id
    @GeneratedValue
    @Column(name = "TIPCODE_ID")
    private Long id;

    @UniqueElements
    private int leftDay;
    private String title;
    private String image;
}
