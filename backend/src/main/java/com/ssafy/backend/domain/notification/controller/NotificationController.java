package com.ssafy.backend.domain.notification.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.notification.dto.NotificationResultDto;
import com.ssafy.backend.domain.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.awt.print.Pageable;
import java.util.Collections;
import java.util.List;

@Tag(name = "알림 API", description = "알림 추가 API")
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    //알림 등록 : 아이디, 읽음처리, 알림타입 - 서버에서만 필요
//    @Operation(summary = "알림 하나 등록하기", description = "알림 등록")
//    @Parameter(name = "NotificationDto", description = "아이디, 읽음처리, 알림타입")
//    @PostMapping("/notification")
//    public ResponseEntity<?> registNotification(@RequestBody NotificationRegistDto notificationRegistDto){
//        int cnt = notificationService.registNotification(notificationRegistDto);
//        return new ResponseEntity<Void>(HttpStatus.OK);
//    }

    //알림 전체 조회 : 아이디, 읽음처리, 알림타입
//    @Operation(summary = "알림 전체 조회하기", description = "모든 알림을 불러옵니다.")
//    @Parameter(name = "없음", description = "없음")
//    @GetMapping("/notification")
//    public ResponseEntity<?> getAllNotification() {
//        List<NotificationResultDto> notificationList = notificationService.getAllNotification();
//        BasicResponse basicResponse;
//        if (notificationList == null) {
//            basicResponse = BasicResponse.builder()
//                    .code(HttpStatus.NO_CONTENT.value())
//                    .httpStatus(HttpStatus.NO_CONTENT)
//                    .message("전체 알림 조회 실패")
//                    .count(0).build();
//        } else {
//            basicResponse = BasicResponse.builder()
//                    .code(HttpStatus.OK.value())
//                    .httpStatus(HttpStatus.OK)
//                    .message("전체 알림 조회 성공")
//                    .count(notificationList.size())
//                    .result(Collections.singletonList(notificationList)).build();
//        }
//        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
//    }

    @Operation(summary = "알림 한 페이지 조회하기", description = "페이징 정보에 해당하는 모든 알림을 불러옵니다.")
    @Parameter(name = "/notification?page=1&size=3", description = "page : 페이지 번호, size : 페이지당 알림 개수 . 최근 알림 size개 가져옴")
    @GetMapping("/notification")
    public ResponseEntity<?> getAllNotification(Pageable pageable) { //pageNumber, pageSize, offset
        List<NotificationResultDto> notificationList = notificationService.getAllNotification(pageable);
        BasicResponse basicResponse;
        if (notificationList == null) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("한 페이지 알림 조회 실패")
                    .count(0).build();
        } else {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("한 페이지 알림 조회 성공")
                    .count(notificationList.size())
                    .result(Collections.singletonList(notificationList)).build();
        }
        return new ResponseEntity<BasicResponse>(basicResponse, basicResponse.getHttpStatus());
    }

    //알림 수정 : put으로 보내기
    @Operation(summary = "알림 하나 수정하기", description = "알림을 읽음 처리 합니다.")
    @Parameter(name = "notificationId", description = "변경 가능한 것 : 호출 시 읽음 처리")
    @PutMapping("/notification/{notificationId}")
    public ResponseEntity<?> modifyNotification(@PathVariable Long notificationId) {
        notificationService.modifyNotification(notificationId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("알림 수정 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "알림 하나 삭제하기", description = "알림을 삭제합니다.")
    @Parameter(name = "notificationId", description = "삭제할 알림 아이디를 보내주세요")
    @DeleteMapping("/notification/{notificationId}")
    public ResponseEntity<?> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("알림 삭제 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
