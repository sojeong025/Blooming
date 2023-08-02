package com.ssafy.backend.domain.reservation.repository;

import com.ssafy.backend.domain.reservation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

}
