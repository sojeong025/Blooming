package com.ssafy.backend.domain.notification.controller;

import com.ssafy.backend.domain.notification.dto.NotificationRegistDto;
import com.ssafy.backend.domain.notification.dto.NotificationResultDto;
import com.ssafy.backend.domain.notification.service.NotificationService;
import com.ssafy.backend.domain.schedule.dto.ScheduleModifyDto;
import com.ssafy.backend.domain.schedule.dto.ScheduleResultDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "알림 API", description = "알림 추가 API")
@RestController
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    //알림 등록 : 아이디, 읽음처리, 알림타입
    @Operation(summary = "알림 하나 등록하기", description = "알림 등록")
    @Parameter(name = "NotificationDto", description = "아이디, 읽음처리, 알림타입")
    @PostMapping("/notification")
    public ResponseEntity<?> registNotification(@RequestBody NotificationRegistDto notificationRegistDto){
        int cnt = notificationService.registNotification(notificationRegistDto);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    //알림 전체 조회 : 아이디, 읽음처리, 알림타입
    @Operation(summary = "알림 전체 조회하기", description = "모든 알림을 불러옵니다.")
    @Parameter(name = "없음", description = "없음")
    @GetMapping("/notification")
    public ResponseEntity<?> getAllNotification(){
        List<NotificationResultDto> notificationList = notificationService.getAllNotification();
        if (notificationList == null){
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
        else{
            return new ResponseEntity<List<NotificationResultDto>>(notificationList, HttpStatus.OK);
        }
    }

    //알림 수정 : put으로 보내기
    @Operation(summary = "알림 하나 수정하기", description = "알림을 읽음 처리 합니다.")
    @Parameter(name = "notificationId", description = "변경 가능한 것 : 호출 시 읽음 처리")
    @PutMapping("/notification/{notificationId}")
    public ResponseEntity<?> modifyNotification(@PathVariable Long notificationId){
        int cnt = notificationService.modifyNotification(notificationId);
//        if (cnt == 0){
//            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//        }
//        else{
        return new ResponseEntity<Void>(HttpStatus.OK);
//        }
    }

}
