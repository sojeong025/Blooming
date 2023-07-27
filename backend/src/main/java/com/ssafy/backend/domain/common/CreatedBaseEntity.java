package com.ssafy.backend.domain.common;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public abstract class CreatedBaseEntity {

    @CreatedDate
    @Column(name = "CREATED_AT")
    private LocalDateTime createdDate;

    public CreatedBaseEntity(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }
}
