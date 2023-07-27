package com.ssafy.backend.domain.notification.repository;

import com.ssafy.backend.domain.notification.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
