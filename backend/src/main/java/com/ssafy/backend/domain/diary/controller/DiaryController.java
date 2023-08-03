package com.ssafy.backend.domain.diary.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.diary.dto.DiaryModifyDto;
import com.ssafy.backend.domain.diary.dto.DiaryRegistDto;
import com.ssafy.backend.domain.diary.dto.DiaryResultDto;
import com.ssafy.backend.domain.diary.service.DiaryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Tag(name = "다이어리 API", description = "다이어리 등록 조회 수정 삭제 API")
@RestController
@RequiredArgsConstructor
public class DiaryController {

	private final DiaryService diaryService;

	@Operation(summary = "다이어리 등록하기", description = "다이어리를 DB에 등록합니다.")
	@Parameter(name = "DiaryRegistDto", description = "dto에 해당하는 정보를 넘겨주세요. 비어있어도 저장 가능.")
	@PostMapping("/diary")
	public ResponseEntity<BasicResponse> registDiary(@RequestBody DiaryRegistDto diaryRegistDto) {
		diaryService.registDiary(diaryRegistDto);

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("다이어리 등록 성공")
			.build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "다이어리 전체 조회하기", description = "회원의 모든 다이어리를 불러옵니다")
	@GetMapping("/diary")
	public ResponseEntity<BasicResponse> getAllDiary() {
		List<DiaryResultDto> diaryList = diaryService.getAllDiary();

		BasicResponse basicResponse;
		if (diaryList.size() == 0) {
			basicResponse = BasicResponse.builder()
				.code(HttpStatus.NO_CONTENT.value())
				.httpStatus(HttpStatus.NO_CONTENT)
				.message("작성한 다이어리가 없습니다.")
				.build();
		} else {
			basicResponse = BasicResponse.builder()
				.code(HttpStatus.OK.value())
				.httpStatus(HttpStatus.OK)
				.message("전체 다이어리 조회 성공")
				.count(diaryList.size())
				.result(Collections.singletonList(diaryList)).build();
		}
		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "다이어리 하나 조회하기", description = "상세 다이어리 하나를 불러옵니다.")
	@Parameter(name = "diary.id", description = "상세 조회할 다이어리 아이디 하나를 넘겨주세요")
	@GetMapping("/diary/{diaryId}")
	public ResponseEntity<BasicResponse> getDiary(@PathVariable Long diaryId) {
		DiaryResultDto diaryResultDto = diaryService.getDiary(diaryId);
		BasicResponse basicResponse;
		if (diaryResultDto == null) {
			basicResponse = BasicResponse.builder()
				.code(HttpStatus.NOT_FOUND.value())
				.httpStatus(HttpStatus.NOT_FOUND)
				.message("유효한 다이어리 정보가 없습니다.")
				.build();
		} else {
			basicResponse = BasicResponse.builder()
				.code(HttpStatus.OK.value())
				.httpStatus(HttpStatus.OK)
				.message("다이어리 상세 조회 성공")
				.count(1)
				.result(Collections.singletonList(diaryResultDto)).build();
		}
		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "다이어리 하나 수정하기", description = "특정 다이어리를 수정합니다.")
	@Parameter(name = "DiaryModifyDto", description = "변경 가능한 것 : title, content, date, image")
	@PutMapping("/diary")
	public ResponseEntity<BasicResponse> modifyDiary(@RequestBody DiaryModifyDto diaryModifyDto) {
		diaryService.modifyDiary(diaryModifyDto);

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("다이어리 수정 성공").build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

	@Operation(summary = "다이어리 하나 삭제하기", description = "특정 다이어리를 삭제합니다.")
	@Parameter(name = "diary.id", description = "삭제할 다이어리의 id를 넘겨주세요")
	@DeleteMapping("/diary/{diaryId}")
	public ResponseEntity<?> deleteDiary(@PathVariable Long diaryId) {
		diaryService.deleteDiary(diaryId);

		BasicResponse basicResponse = BasicResponse.builder()
			.code(HttpStatus.OK.value())
			.httpStatus(HttpStatus.OK)
			.message("다이어리 삭제 성공").build();

		return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
	}

}
