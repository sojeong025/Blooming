package com.ssafy.backend.domain.invitation.repository;

import com.ssafy.backend.domain.invitation.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation, Long> {

}
