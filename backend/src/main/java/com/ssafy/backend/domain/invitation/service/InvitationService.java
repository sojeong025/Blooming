package com.ssafy.backend.domain.invitation.service;

import java.util.Optional;

import com.ssafy.backend.domain.couple.Couple;
import com.ssafy.backend.domain.invitation.Invitation;
import com.ssafy.backend.domain.invitation.dto.InvitationRegistDto;
import com.ssafy.backend.domain.invitation.dto.InvitationResultDto;
import com.ssafy.backend.domain.invitation.repository.InvitationRepository;
import com.ssafy.backend.domain.user.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InvitationService {
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;

    public void registInvitation(InvitationRegistDto invitationRegistDto) {
        //이게맞나 : dto -> entity 변환
        Invitation invitation = new Invitation(
                invitationRegistDto.getThumbnail(),
                invitationRegistDto.getGroomFatherName(),
                invitationRegistDto.getGroomFatherPhone(),
                invitationRegistDto.getGroomMotherName(),
                invitationRegistDto.getGroomMotherPhone(),
                invitationRegistDto.getBrideFatherName(),
                invitationRegistDto.getBrideFatherPhone(),
                invitationRegistDto.getBrideMotherName(),
                invitationRegistDto.getBrideMotherPhone(),
                invitationRegistDto.getTitle(),
                invitationRegistDto.getContent(),
                invitationRegistDto.getWeddingHallName(),
                invitationRegistDto.getFloor(),
                invitationRegistDto.getAddress(),
                invitationRegistDto.getDate(),
                invitationRegistDto.getTime()
        );
        
        //유저 찾기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Couple couple = user.getCouple();

        //커플 매핑
        invitation.setCouple(couple);

        invitationRepository.save(invitation);
    }

    public Optional<Invitation> getInvitation() {
        //유저 찾기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("JWT token: 회원 이메일에 해당하는 회원이 없습니다."));
        Couple couple = user.getCouple();

        //커플에 해당하는 청첩장 반환
        Optional<Invitation> findInvitation = invitationRepository.findByCouple(couple);

        return findInvitation;
    }

    public void modifyInvitation(Long invitationId, InvitationRegistDto invitationRegistDto) {
        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new IllegalArgumentException("invitationId에 해당하는 청첩장이 없습니다."));
        invitation.update(invitationRegistDto);
    }
}
