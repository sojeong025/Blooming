package com.ssafy.backend.domain.diary;

import com.ssafy.backend.domain.diary.dto.DiaryModifyDto;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Diary{

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


    public Diary(String title, String content, String image, String date) {
        this.title = title;
        this.content = content;
        this.image = image;
        this.date = date;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void update(DiaryModifyDto diaryModifyDto) {
        this.title = diaryModifyDto.getTitle();
        this.content = diaryModifyDto.getContent();
        this.date = diaryModifyDto.getDate();
        this.image = diaryModifyDto.getImage();

    }

}
