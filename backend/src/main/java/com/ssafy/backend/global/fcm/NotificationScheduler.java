package com.ssafy.backend.global.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.backend.domain.notification.NotificationType;
import com.ssafy.backend.domain.notification.ReadStatus;
import com.ssafy.backend.domain.notification.dto.NotificationRegistDto;
import com.ssafy.backend.domain.notification.service.NotificationService;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.repository.ScheduleRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.global.redis.fcm.FcmToken;
import com.ssafy.backend.global.redis.fcm.FcmTokenRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class NotificationScheduler {

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.firebase-topic}")
    String topic;

    private FirebaseMessaging firebaseMessaging;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private FcmTokenRepository fcmTokenRepository;



    @PostConstruct
    public void firebaseSetting() throws IOException {
        //내 firebase 콘솔에서 가져온 비공개 키 파일을 통해 백엔드에서 파이어베이스에 접속함
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource("firebase/blooming-18b74-firebase-adminsdk-i9dwm-372e530990.json").getInputStream())
                .createScoped((Arrays.asList(fireBaseCreateScoped)));
        FirebaseOptions secondaryAppConfig = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(secondaryAppConfig);
        this.firebaseMessaging = FirebaseMessaging.getInstance(app);
    }

    //시간에 맞게 푸시 알림을 스케줄링하는 코드
//    @Scheduled(cron = "* * 1 * * ?")
//    @Scheduled(cron = "0 0 1 * * ?")
    @Scheduled(fixedDelay = 10000)
    public void pushMorningDietAlarm() {

        //여기서 일정 DB를 읽고 일정이 한 달, 삼 주, 일주일, 하루 전, 당일이면 알림을 보냄.
        //나중에 지난 일정은 삭제? 해도 될듯
        //일정 repository에서 day를 매개변수로 넘겨주면서, 30일, 21일, 7일, 1일, 0일 을 인자로 해서 date 비교해서 해당되는거 가져옴. 알림 보내고 테이블에 추가.

        //일단 임시
        for (int day : new int[]{0, 1, 7, 30}) {
            System.out.println(day + "일 후 알림");

            //day일 후 스케줄을 일단 읽어옴 -> 푸시 알림 보내기 + 알림 로그 테이블에 저장
            List<Schedule> schedules = scheduleRepository.findAllByScheduleDate(LocalDate.now().plusDays(day));
            for (Schedule schedule : schedules) {
                System.out.println(schedule);

                //커플 아이디에 해당하는 유저 두 명을 찾는다. 남자는 신랑, 여자는 신부로 매핑한다.
                User groom = null;
                User bride = null;
                List<User> users = schedule.getCouple().getUsers();
                for (User user : users){
                    if (user.getGender().equals("MALE")){
                        groom = user;
                    }
                    else if(user.getGender().equals("FEMALE")){
                        bride = user;
                    }
                }

                //스케쥴 타입에 따라 다르게 알림 내용 처리
                String title = schedule.getScheduleDate() + " " + schedule.getTitle(); //알림 제목은 일단 같게
                String contentGroom = "";
                String contentBride = "";

                //null 참조 방지를 위해 닉네임 미리 받기
                String groomNickname = (groom != null) ? groom.getNickname() : "예비신랑";
                String brideNickname = (bride != null) ? bride.getNickname() : "예비신부";
                switch(schedule.getScheduledBy()){
                    case COMMON:
                        //두 명에게 같은 알림 전송
                        contentGroom = "내일은 두 분이 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        contentBride = "내일은 두 분이 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        break;
                    case MALE:
                        //신랑 일정.
                        contentGroom = "내일은 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        contentBride = "내일은 " + groomNickname + "님이 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        break;
                    case FEMALE:
                        //신부 일정.
                        contentGroom = "내일은 " + brideNickname + "님이 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        contentBride = "내일은 " + schedule.getContent() + " 하는 날이에요. 클릭해서 팁을 알아보세요!";
                        break;
                }

                //처리한 내용을 알림 전송(신랑, 신부)
                log.info(sendNotificationByToken(new FCMNotificationRequestDto(groom, title, contentGroom)));
                log.info(sendNotificationByToken(new FCMNotificationRequestDto(bride, title, contentBride)));
            }
        }
    }


    private String sendNotificationByToken(FCMNotificationRequestDto fcmDto) {
        User user = fcmDto.getUser();

        if (user != null) {
            //토큰 받아오는 걸로 수정
//            String token = "eKbKoD7ETfqRiIKFF_4Zom:APA91bHbzIq11sl8_qbv1yE7-RFqjXnywPVo5u13FMC9kqIjJTrHkXIfqWODhBYvTS3EOGlOLQzlXUvJNwXn4EFbgoAC_WZzylV9yo5KOGLj96agM68p8qPc8bCPODgRk9aP_TNeKiLn";
//            String token = user.getFcmToken();
            //user id를 통해 redis에서 받아오자 : 일단 테스트는 보류
            FcmToken fcmToken = fcmTokenRepository.findById(String.valueOf(user.getId()))
                    .orElse(null);

            if (fcmToken != null) {
                String token = fcmToken.getValue(); //redis에서 토큰 읽어온거

                Notification notification = Notification.builder()
                        .setTitle(fcmDto.getTitle())
                        .setBody(fcmDto.getBody())
                        .build();

                Message message = Message.builder()
                        .setToken(token)
                        .setNotification(notification)
                        .build();

                try {
                    firebaseMessaging.send(message);

                    //2. 일림 로그 테이블에 저장 : 사용자마다, 알림 테이블에 저장.
                    notificationService.registNotification(new NotificationRegistDto(
                            ReadStatus.UNREAD,
                            NotificationType.SCHEDULE,
                            fcmDto.getTitle(),
                            fcmDto.getBody(),
                            fcmDto.getUser().getId()
                    ));
                    return "알림 전송 성공 " + fcmDto.getUser();
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 전송 실패 " + fcmDto.getUser();
                }
            } else {
                return "Redis에 유저 FCM token 없음 " + fcmDto.getUser();
            }
        } else {
            return "해당 유저 없음 " + fcmDto.getUser();
        }
    }
}
