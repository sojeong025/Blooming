package com.ssafy.backend.domain.diary;

import com.ssafy.backend.domain.common.CreatedAndUpdatedBaseEntity;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary extends CreatedAndUpdatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "DIARY_ID")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="USER_ID")
    private User user;

    private String title;
    private String content; // TEXT 형식 변경 필요
    private String date; // 날짜 지정을 어떻게 할건지.

    private String image; // 이미지 주소로 할건지 변경 필요



}
