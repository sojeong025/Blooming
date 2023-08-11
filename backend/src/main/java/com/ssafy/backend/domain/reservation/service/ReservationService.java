package com.ssafy.backend.domain.reservation.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.reservation.Reservation;
import com.ssafy.backend.domain.reservation.dto.ReservationRegistDto;
import com.ssafy.backend.domain.reservation.dto.ReservationResultDto;
import com.ssafy.backend.domain.reservation.repository.ReservationRepository;
import com.ssafy.backend.domain.schedule.Schedule;
import com.ssafy.backend.domain.schedule.ScheduleType;
import com.ssafy.backend.domain.schedule.ScheduledBy;
import com.ssafy.backend.domain.schedule.dto.ReservationScheduleRegistDto;
import com.ssafy.backend.domain.schedule.dto.ReservationScheduleResultDto;
import com.ssafy.backend.domain.schedule.service.ScheduleService;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ScheduleService scheduleService;
    private final RedisTemplate redisTemplate;

    @Transactional
    public ReservationScheduleResultDto registerReservation(ReservationRegistDto reservationRegistDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }
        String userEmail = authentication.getName();

        // 유저, 상품 객체 찾기
        User findUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        Product product = productRepository.findById(reservationRegistDto.getProduct_id())
                .orElseThrow(() -> new IllegalArgumentException("아이디에 해당하는 상품이 없습니다."));

        //예약 객체 생성
        Reservation reservation = new Reservation(reservationRegistDto.getReservedDate(), reservationRegistDto.getReservedTime());
        reservation.setUser(findUser);
        reservation.setProduct(product);

        //객체 저장
        reservationRepository.save(reservation);

        //예약 시 스케줄 자동 등록
        //등록한 예약의 id 가져오기 : 그 1차캐시로.. 바로 되려나 아래처럼
        
        //스케줄 타입 결정
        ScheduleType scheduleType = null;
        switch(product.getProductType()){
            case HALL:
                scheduleType = ScheduleType.HALL; break;
            case STUDIO:
            case DRESS:
            case MAKEUP:
                scheduleType = ScheduleType.SDM; break;
        }
        Schedule savedSchedule = scheduleService.registReservationSchedule(new ReservationScheduleRegistDto(
                product.getItemName() + " 예약",
                product.getCompany() + " 에 방문해주세요",
                reservationRegistDto.getReservedDate(),
                reservationRegistDto.getReservedTime(),
                ScheduledBy.COMMON,
                scheduleType,
                reservation.getId()
        ));

        //예약 시 랭킹 보드에 추가 ranking - productId
        try{
            System.out.println("=============redis: ranking");
            String key = "ranking:" + product.getProductType();
            String value = String.valueOf(product.getId());
            Long score = 1L;
            //랭킹 키로 해당 value 1 증가해보기
            try{
                //일단 증가시켜보기
                redisTemplate.opsForZSet().incrementScore(key, value, score);
            }catch (Exception e){
                //에러나면 없는 것이므로 추가하기
                System.out.println("===처음 추가함===");
                redisTemplate.opsForZSet().add(key, value, score);
            }
            System.out.println("저장 완료");
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("저장 실패");
        }
        finally {
            System.out.println("=============redis");
        }

        return new ReservationScheduleResultDto(savedSchedule.getId());
    }

    public List<ReservationResultDto> getUserReservation() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        //객체 찾기
        User findUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));

        List<Reservation> reservations = findUser.getReservations();
        List<ReservationResultDto> reservationResultDtos = new ArrayList<>();
        for (Reservation reservation : reservations){
            ReservationResultDto reservationResultDto = new ReservationResultDto(
                    reservation.getId(),
                    reservation.getReservedDate(),
                    reservation.getReservedTime(),
                    reservation.getProduct().getId()
            );
            reservationResultDtos.add(reservationResultDto);
        }
        return reservationResultDtos;
    }

    @Transactional
    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);

        //예약 취소하면 일정도 삭제..
        scheduleService.deleteReservationSchedule(reservationId);
    }
}
