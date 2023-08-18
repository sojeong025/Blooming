package com.ssafy.backend.domain.tipBox;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TipBox {
    @Id
    @GeneratedValue
    @Column(name = "TIPBOX_ID")
    private Long id;

    private String content;

    @ManyToOne//(fetch = LAZY)
    @JoinColumn(name = "TIPCODE_ID")
    private TipCode tipCode;

}
