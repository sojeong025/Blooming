package com.ssafy.backend.domain.notification.repository;

import com.google.api.gax.paging.Page;
import com.ssafy.backend.domain.notification.Notification;
import com.ssafy.backend.domain.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByIdDesc(User user, Pageable pageable);
}
