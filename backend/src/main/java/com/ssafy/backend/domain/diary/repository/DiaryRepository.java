package com.ssafy.backend.domain.diary.repository;

import com.ssafy.backend.domain.diary.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {

    List<Diary> findAllByUserId(Long userId);

    void deleteAllByUserId(Long userId);
}
