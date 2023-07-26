package com.ssafy.backend.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.ScheduleRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
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
import java.util.Optional;

@Slf4j
@Service
public class NotificationScheduler {

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.firebase-topic}")
    String topic;

    private FirebaseMessaging firebaseMessaging;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;


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
    @Scheduled(cron = "* * * * * ?")
    public void pushMorningDietAlarm() throws FirebaseMessagingException{
        log.info("매 시 매 초 알림");

        //여기서 일정 DB를 읽고 일정이 한 달, 삼 주, 일주일, 하루 전, 당일이면 알림을 보냄.
        //나중에 지난 일정은 삭제? 해도 될듯
        //일정 repository에서 day를 매개변수로 넘겨주면서, 30일, 21일, 7일, 1일, 0일 을 인자로 해서 date 비교해서 해당되는거 가져옴. 알림 보내고 테이블에 추가.

        /*
         30일 후
         현재 날짜 + 30일 해서 해당 날짜의 일정인 경우, 일정 테이블에서 (커플 아이디, 카테고리, 일정 이름, 내용) DTO을 가져옴
         카테고리에 따라 처리.
         일단 공통으로 치면: 신랑 아이디와 신부 아이디를 유저 테이블에서 가져와서 (join) 해당 id를 타겟으로 서로 다른 메시지를 보냄

         일단은 한 사람에게 같은 메시지 보내기

insert into

insert into schedule (schedule_id, category, couple_id, schedule_at, title, content)
values (1, '공통', 1, NOW(), '알림제목', '알림내용');

select * from schedule;

방법1. 쿼리로 찾기
//지금으로부터 30일 후의 일정 얻기
SELECT *
FROM schedule
WHERE
FORMATDATETIME(TIMESTAMPADD(DAY, 30, NOW()), 'yyyy-MM-dd')
= FORMATDATETIME(schedule_at, 'yyyy-MM-dd');

방법2. spring boot jpa 만들기(함수명으로)
....흠..
findByScheduleAt(30일 후)

         findBy
         */

        //일단은 쿼리로 짜보자

        //근데 이건 다 돼야 할 수 있을듯. 커플이랑 이런거
        System.out.println("30일 후");
        List<Schedule> schedules = scheduleRepository.findAllByScheduleDate(LocalDate.now().plusDays(30));
        for (Schedule s : schedules){
            System.out.println(s);
        }

        System.out.println("10일 후");
        schedules = scheduleRepository.findAllByScheduleDate(LocalDate.now().plusDays(10));
        for (Schedule s : schedules){
            System.out.println(s);
        }

        System.out.println("오늘");
        schedules = scheduleRepository.findAllByScheduleDate(LocalDate.now().plusDays(0));
        for (Schedule s : schedules){
            System.out.println(s);
        }

        Long targetId = 1L;
        String subject = "30일 후 일정이 있습니다";
        String content = "일정 내용은 머시기";


        //토큰, 일정 이름(Title), 상세 내용(body)을 보냄
        String result = sendNotificationByToken(new FCMNotificationRequestDto(targetId, subject, content)); // 첫 번째로 넣은 유저
        log.info(result);
//        pushAlarm(MORNING_DIET);

    }


    /////1

    private String sendNotificationByToken(FCMNotificationRequestDto fcmDto) {
        Optional<User> user = userRepository.findById(fcmDto.getTargetUserId());

        if (user.isPresent()) {
            String token = "eKbKoD7ETfqRiIKFF_4Zom:APA91bHbzIq11sl8_qbv1yE7-RFqjXnywPVo5u13FMC9kqIjJTrHkXIfqWODhBYvTS3EOGlOLQzlXUvJNwXn4EFbgoAC_WZzylV9yo5KOGLj96agM68p8qPc8bCPODgRk9aP_TNeKiLn";
//            token = user.get().getFirebaseToken();
            if (token != null) {
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
                    return "알림 전송 성공";
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 전송 실패";
                }
            } else {
                return "서버에 유저 firebase token 없음";
            }
        } else{
            return "해당 유저 없음 " + fcmDto.getTargetUserId();
        }
    }


//    푸시 알림을 보내는 코드
//    private void pushAlarm(RequestPushMessage data) throws FirebaseMessagingException{
//        Message message = getMessage(data);
//        System.out.println(sendMessage(message));
//    }
//
//    private Message getMessage(RequestPushMessage data){
//        Notification notification = Notification.builder().setTitle(data.getTitle()).setBody(data.getBody()).build();
//        Message.Builder builder = Message.builder();
//        Message message = builder.setTopic(topic).setNotification(notification).build();
//        return message;
//    }
//
//    public String sendMessage(Message message) throws FirebaseMessagingException{
//        return this.firebaseMessaging.send(message);
//    }
}
