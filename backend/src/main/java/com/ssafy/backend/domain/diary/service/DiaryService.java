package com.ssafy.backend.domain.diary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.diary.Diary;
import com.ssafy.backend.domain.diary.dto.DiaryModifyDto;
import com.ssafy.backend.domain.diary.dto.DiaryRegistDto;
import com.ssafy.backend.domain.diary.dto.DiaryResultDto;
import com.ssafy.backend.domain.diary.repository.DiaryRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DiaryService {
	private final DiaryRepository diaryRepository;
	private final UserRepository userRepository;

	public void registDiary(DiaryRegistDto diaryRegistDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByEmail(authentication.getName())
			.orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

		Diary diary = new Diary(
			diaryRegistDto.getTitle(),
			diaryRegistDto.getContent(),
			diaryRegistDto.getImage(),
			diaryRegistDto.getDate()
		);
		diary.setUser(user);

		diaryRepository.save(diary);
	}

	public List<DiaryResultDto> getAllDiary() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User user = userRepository.findByEmail(authentication.getName())
			.orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));

		List<Diary> diaries = diaryRepository.findAllByUserId(user.getId());
		List<DiaryResultDto> result = new ArrayList<>();
		for (Diary diary : diaries) {
			DiaryResultDto diaryResultDto = new DiaryResultDto(
				diary.getId(),
				diary.getTitle(),
				diary.getContent(),
				diary.getDate(),
				diary.getImage()
			);
			result.add(diaryResultDto);
		}

		return result;
	}

	public void modifyDiary(DiaryModifyDto diaryModifyDto) {
		//jpa.. 이용해서 해당 스케줄 아이디로 스케줄 객체 찾아서 set으로 변경? -- 이게맞나
		Diary originalDiary = diaryRepository.findById(diaryModifyDto.getId())
			.orElseThrow(() -> new IllegalArgumentException("다이어리 아이디에 해당하는 다이어리가 없습니다."));

		originalDiary.update(diaryModifyDto);
	}

	public void deleteDiary(Long diaryId) {
		diaryRepository.deleteById(diaryId);
	}

	public DiaryResultDto getDiary(Long diaryId) {
		Diary diary = diaryRepository.findById(diaryId)
			.orElseThrow(() -> new IllegalArgumentException("다이어리 아이디에 해당하는 다이어리가 없습니다."));

		return new DiaryResultDto(
			diary.getId(),
			diary.getTitle(),
			diary.getContent(),
			diary.getDate(),
			diary.getImage()
		);
	}
}
