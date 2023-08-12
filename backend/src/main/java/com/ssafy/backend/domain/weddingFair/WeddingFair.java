package com.ssafy.backend.domain.weddingFair;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class WeddingFair {
    @Id
    @GeneratedValue
    @Column(name = "wedding_fair_id")
    private Long id;

    private String thumbnail;
    private String name;
    private String datetime;
    private String place;
    private String link;
}
