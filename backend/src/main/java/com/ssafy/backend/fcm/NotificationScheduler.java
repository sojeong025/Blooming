package com.ssafy.backend.fcm;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.Arrays;

import static com.ssafy.backend.fcm.RequestPushMessage.MORNING_DIET;

@Slf4j
@Service
public class NotificationScheduler {
    ////2

    @Value("${project.properties.firebase-create-scoped}")
    String fireBaseCreateScoped;

    @Value("${project.properties.firebase-topic}")
    String topic;

    private FirebaseMessaging firebaseMessaging;
    @Autowired
    private UserRepository userRepository;


    @PostConstruct
    public void firebaseSetting() throws IOException {
        //내 firebase 콘솔에서 가져온 비공개 키 파일을 통해 백엔드에서 파이어베이스에 접속함
        GoogleCredentials googleCredentials = GoogleCredentials.fromStream(new ClassPathResource("firebase/blooming-18b74-firebase-adminsdk-i9dwm-005d9b52cd.json").getInputStream())
                .createScoped((Arrays.asList(fireBaseCreateScoped)));
        FirebaseOptions secondaryAppConfig = FirebaseOptions.builder()
                .setCredentials(googleCredentials)
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(secondaryAppConfig);
        this.firebaseMessaging = FirebaseMessaging.getInstance(app);
    }

    //시간에 맞게 푸시 알림을 스케줄링하는 코드
    @Scheduled(cron = "0 * 15 * * ?")
    public void pushMorningDietAlarm() throws FirebaseMessagingException{
        log.info("14시 매 분 알림");

        //여기서 알림 DB를 읽고 오늘 보낼 사람한테 보냄
        //토큰, 일정 이름(Title), 상세 내용(body)을 보냄
//        String result = sendNotificationByToken(new FCMNotificationRequestDto(1L, "제목", "내용")); // 첫 번째로 넣은 유저
//        log.info(result);
        pushAlarm(MORNING_DIET);

    }


    /////1

//    private String sendNotificationByToken(FCMNotificationRequestDto fcmDto) {
//        Optional<User> user = userRepository.findById(fcmDto.getTargetUserId());
//
//        if (user.isPresent()) {
//            String token = null;
////            token = user.get().getFirebaseToken();
//            if (token != null) {
//                Notification notification = Notification.builder()
//                        .setTitle(fcmDto.getTitle())
//                        .setBody(fcmDto.getBody())
//                        .build();
//
//                Message message = Message.builder()
//                        .setToken(token)
//                        .setNotification(notification)
//                        .build();
//
//                try {
//                    firebaseMessaging.send(message);
//                    return "알림 전송 성공";
//                } catch (FirebaseMessagingException e) {
//                    e.printStackTrace();
//                    return "알림 전송 실패";
//                }
//            } else {
//                return "서버에 유저 firebase token 없음";
//            }
//        } else{
//            return "해당 유저 없음 " + fcmDto.getTargetUserId();
//        }
//    }
//
//    @Scheduled(cron = "0 0 13 * * ?")
//    public void pushLunchDietAlarm() throws FirebaseMessagingException{
//        log.info("점심 식사 알림");
//        pushAlarm(LUNCH_DIET);
//    }
//
//    @Scheduled(cron = "0 0 19 * * ?")
//    public void pushDinnerDietAlarm() throws FirebaseMessagingException{
//        log.info("저녁 식사 알림");
//        pushAlarm(DINER_DIET);
//    }

//    푸시 알림을 보내는 코드
    private void pushAlarm(RequestPushMessage data) throws FirebaseMessagingException{
        Message message = getMessage(data);
        System.out.println(sendMessage(message));
    }

    private Message getMessage(RequestPushMessage data){
        Notification notification = Notification.builder().setTitle(data.getTitle()).setBody(data.getBody()).build();
        Message.Builder builder = Message.builder();
        Message message = builder.setTopic(topic).setNotification(notification).build();
        return message;
    }

    public String sendMessage(Message message) throws FirebaseMessagingException{
        return this.firebaseMessaging.send(message);
    }
}
