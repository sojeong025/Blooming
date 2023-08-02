package com.ssafy.backend.domain.diary.service;


import com.ssafy.backend.domain.diary.Diary;
import com.ssafy.backend.domain.diary.dto.DiaryModifyDto;
import com.ssafy.backend.domain.diary.dto.DiaryRegistDto;
import com.ssafy.backend.domain.diary.dto.DiaryResultDto;
import com.ssafy.backend.domain.diary.repository.DiaryRepository;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.dto.ScheduleRegistDto;
import com.ssafy.backend.domain.schedule.dto.ScheduleResultDto;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final UserRepository userRepository;

    public void registDiary(DiaryRegistDto diaryRegistDto) {
        Diary diary = new Diary(
                diaryRegistDto.getTitle(),
                diaryRegistDto.getContent(),
                diaryRegistDto.getImage(),
                diaryRegistDto.getDiarydate()
        );
    }

    public List<DiaryResultDto> getAllDiary(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Long userId = user.getId();
        List<Diary> diaries = diaryRepository.findAllByUserId(userId);
        List<DiaryResultDto> result = new ArrayList<>();
        for (Diary diary : diaries){
            DiaryResultDto diaryResultDto = new DiaryResultDto(
                    diary.getId(),
                    diary.getTitle(),
                    diary.getContent(),
                    diary.getDiarydate(),
                    diary.getImage()
            );
            result.add(diaryResultDto);
        }

        return result;
    }

    public int modifyDiary(DiaryModifyDto diaryModifyDto){


        return 1;
    }

    public int deleteDiary(Long diaryId){
        return 1;

    }

    public DiaryResultDto getOneDiary(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(() -> new IllegalArgumentException("다이어리 아이디에 해당하는 다이어리가 없습니다."));

        DiaryResultDto diaryResultDto = new DiaryResultDto(
                diary.getId(),
                diary.getTitle(),
                diary.getContent(),
                diary.getDiarydate(),
                diary.getImage()
        );

        return diaryResultDto;
    }
}
