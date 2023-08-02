package com.ssafy.backend.domain.reservation.service;

import com.ssafy.backend.domain.product.Product;
import com.ssafy.backend.domain.product.repository.ProductRepository;
import com.ssafy.backend.domain.reservation.Reservation;
import com.ssafy.backend.domain.reservation.dto.ReservationRegistDto;
import com.ssafy.backend.domain.reservation.dto.ReservationResultDto;
import com.ssafy.backend.domain.reservation.repository.ReservationRepository;
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
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void registerReservation(ReservationRegistDto reservationRegistDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
        }

        //객체 찾기
        User findUser = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
        Product product = productRepository.findById(reservationRegistDto.getProduct_id())
                .orElseThrow(() -> new IllegalArgumentException("아이디에 해당하는 상품이 없습니다."));

        //예약 객체 생성
        Reservation reservation = new Reservation(reservationRegistDto.getReserved_at());
        reservation.setUser(findUser);
        reservation.setProduct(product);

        //객체 저장
        reservationRepository.save(reservation);
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
                    reservation.getReservedAt(),
                    reservation.getProduct().getId()
            );
            reservationResultDtos.add(reservationResultDto);
        }
        return reservationResultDtos;
    }

    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }
}
