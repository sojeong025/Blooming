package com.ssafy.backend.domain.diary.service;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.couple.repository.CoupleRepository;
import com.ssafy.backend.domain.diary.Diary;
import com.ssafy.backend.domain.diary.dto.DiaryModifyDto;
import com.ssafy.backend.domain.diary.dto.DiaryRegistDto;
import com.ssafy.backend.domain.diary.dto.DiaryResultDto;
import com.ssafy.backend.domain.diary.repository.DiaryRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.fcm.FCMNotificationRequestDto;
import com.ssafy.backend.global.fcm.NotificationScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;
    private final NotificationScheduler notificationScheduler;


    public long registDiary(DiaryRegistDto diaryRegistDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        Diary diary = new Diary(diaryRegistDto);
        diary.setUser(user);

        Diary savedDiary = diaryRepository.save(diary);

        //다이어리 작성시 상대방에게 알림 보내기
        Couple couple = user.getCouple();
        for (User userOne : couple.getUsers()){
            if(user.getId() != userOne.getId()){
                String title = user.getName()+"님이 다이어리를 작성 했습니다.";
                String content = "오늘 있었던 일을 다이어리에 작성해 보세요.";
                notificationScheduler.sendNotificationByToken(new FCMNotificationRequestDto(userOne, title, content));
            }
        }

        return savedDiary.getId();
    }

    public List<DiaryResultDto> getAllDiary() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        List<Diary> diaries = diaryRepository.findAllByUserId(user.getId());
        return diaries.stream()
                .map(diary -> new DiaryResultDto(diary.getId(), diary.getTitle(), diary.getContent(), diary.getDate(), diary.getImage()))
                .collect(Collectors.toList());
    }

    public List<DiaryResultDto> getAllFianceDiary() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User finduser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

        List<User> coupleUser = finduser.getCouple().getUsers();

        for (User user : coupleUser) {
            if (user != finduser) {
                List<Diary> diaries = diaryRepository.findAllByUserId(user.getId());

                return diaries.stream()
                        .map(diary -> new DiaryResultDto(diary.getId(), diary.getTitle(), diary.getContent(), diary.getDate(), diary.getImage()))
                        .collect(Collectors.toList());
            }
        }

        return new ArrayList<>();
    }

    public void modifyDiary(DiaryModifyDto diaryModifyDto) {
        Diary originalDiary = diaryRepository.findById(diaryModifyDto.getId())
                .orElseThrow(() -> new IllegalArgumentException("다이어리 아이디에 해당하는 다이어리가 없습니다."));

        originalDiary.update(diaryModifyDto);
    }

    public void deleteDiary(Long diaryId) {
        diaryRepository.deleteById(diaryId);
    }

    public DiaryResultDto getDiary(Long diaryId) {
        return diaryRepository.findById(diaryId)
                .map(diary -> new DiaryResultDto(diary.getId(), diary.getTitle(), diary.getContent(), diary.getDate(), diary.getImage()))
                .orElseThrow(() -> new IllegalArgumentException("다이어리 아이디에 해당하는 다이어리가 없습니다."));
    }
}
