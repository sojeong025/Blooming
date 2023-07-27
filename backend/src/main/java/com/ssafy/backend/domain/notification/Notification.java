package com.ssafy.backend.domain.notification;

import com.ssafy.backend.domain.common.CreatedBaseEntity;
import com.ssafy.backend.domain.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Notification extends CreatedBaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "NOTIFICATION_ID")
    private Long id;


    @Enumerated(EnumType.STRING)
    private ReadStatus readStatus;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    //알림 로그를 위해 추가
    private String title;
    private String content;

    public void setUser(User user) {
        this.user = user;
        user.getNotifications().add(this);
    }

    public Notification(ReadStatus readStatus, NotificationType notificationType, String title, String content) {
        this.readStatus = readStatus;
        this.notificationType = notificationType;
        this.title = title;
        this.content = content;
    }

    public void updateReadStatus() {
        this.readStatus = ReadStatus.READ;
    }
}
