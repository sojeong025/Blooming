package com.ssafy.backend.domain.invitation.repository;

import java.util.Optional;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.invitation.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {
	Optional<Invitation> findByCouple(Couple couple);
}
