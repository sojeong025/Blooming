package com.ssafy.backend.domain.reservation.service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

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

        boolean validTime = isValidTime(reservationRegistDto, product);

        if (validTime) {
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
            switch (product.getProductType()) {
                case HALL:
                    scheduleType = ScheduleType.HALL;
                    break;
                case STUDIO:
                case DRESS:
                case MAKEUP:
                    scheduleType = ScheduleType.SDM;
                    break;
            }
            Schedule savedSchedule = scheduleService.registReservationSchedule(new ReservationScheduleRegistDto(
                    product.getCompany() + " 에 방문해주세요.",
                    product.getItemName() + " 예약",
                    reservationRegistDto.getReservedDate(),
                    reservationRegistDto.getReservedTime(),
                    ScheduledBy.COMMON,
                    scheduleType,
                    reservation.getId()
            ));

            //예약 시 랭킹 보드에 추가 ranking - productId
            updateProductRanking(product);

            // 예약시 product 객체의 reservation_cnt 올리기
            product.addReservationCount();

            return new ReservationScheduleResultDto(savedSchedule.getId());
        } else {
            throw new IllegalArgumentException("예약 가능한 시간이 아닙니다. 업체 운영 시간 내에 30분 단위의 예약만 가능합니다.");
        }
    }

    private void updateProductRanking(Product product) {
        String key = "ranking:" + product.getProductType();
        String value = String.valueOf(product.getId());
        long score = 1L;
        //랭킹 키로 해당 value 1 증가해보기
        try {
            //일단 증가시켜보기
            if (redisTemplate.opsForZSet().incrementScore(key, value, score) == null) {
                redisTemplate.opsForZSet().add(key, value, score);
            }
            // redisTemplate.opsForZSet().incrementScore(key, value, score);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static boolean isValidTime(ReservationRegistDto reservationRegistDto, Product product) {
        LocalTime reservedTime = reservationRegistDto.getReservedTime();
        String companyTime = product.getCompanyTime();
        StringTokenizer st = new StringTokenizer(companyTime, "~");
        LocalTime openTime = LocalTime.parse(st.nextToken().trim());
        LocalTime closeTime = LocalTime.parse(st.nextToken().trim());

        // 오픈 시간과 마감시간 30분 전인지, 30분 단위의 예약 요청이 맞는지
        return reservedTime.isAfter(openTime) && reservedTime.isBefore(closeTime.minusMinutes(30)) && (reservedTime.getMinute() == 0 || reservedTime.getMinute() == 30);
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
                    reservation.getProduct().getId(),
                    reservation.getProduct().getProductType(),
                    reservation.getProduct().getThumbnail(),
                    reservation.getProduct().getCompany()
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
