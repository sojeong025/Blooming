package com.ssafy.backend.domain.invitation.controller;

import com.ssafy.backend.domain.common.BasicResponse;
import com.ssafy.backend.domain.invitation.Invitation;
import com.ssafy.backend.domain.invitation.dto.InvitationRegistDto;
import com.ssafy.backend.domain.invitation.dto.InvitationResultDto;
import com.ssafy.backend.domain.invitation.service.InvitationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@Tag(name = "모바일청첩장 API", description = "모바일 청첩장 CRU API")
@RestController
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    @Operation(summary = "모바일 청첩장 하나 등록하기", description = "모바일 청찹장을 DB에 등록합니다.")
    @Parameter(name = "InvitationRegistDto", description = "dto에 해당하는 정보를 넘겨주세요. 비어있어도 저장 가능.")
    @PostMapping("/invitation")
    public ResponseEntity<BasicResponse> registInvitation(@RequestBody InvitationRegistDto invitationRegistDto) {
        invitationService.registInvitation(invitationRegistDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("청첩장 등록 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "모바일 청첩장 하나 가져오기", description = "본인의 모바일 청찹장을 DB에서 가져옵니다.")
    @GetMapping("/invitation")
    public ResponseEntity<BasicResponse> getInvitation() {
        Invitation invitation = invitationService.getInvitation();

        BasicResponse basicResponse;
        if (invitation == null) {
            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.NO_CONTENT.value())
                    .httpStatus(HttpStatus.NO_CONTENT)
                    .message("내 청첩장 조회 실패")
                    .count(0).build();
        } else {
            InvitationResultDto invitationResultDto = new InvitationResultDto(
                    invitation.getId(),
                    invitation.getThumbnail(),
                    invitation.getGroomFatherName(),
                    invitation.getGroomFatherPhone(),
                    invitation.getGroomMotherName(),
                    invitation.getGroomMotherPhone(),
                    invitation.getBrideFatherName(),
                    invitation.getBrideFatherPhone(),
                    invitation.getBrideMotherName(),
                    invitation.getBrideMotherPhone(),
                    invitation.getTitle(),
                    invitation.getContent(),
                    invitation.getWeddingHallName(),
                    invitation.getFloor(),
                    invitation.getAddress(),
                    invitation.getDate(),
                    invitation.getTime(),
                    invitation.getGroomName(),
                    invitation.getGroomPhone(),
                    invitation.getBrideName(),
                    invitation.getBridePhone()
            );

            basicResponse = BasicResponse.builder()
                    .code(HttpStatus.OK.value())
                    .httpStatus(HttpStatus.OK)
                    .message("내 청첩장 조회 성공")
                    .count(1)
                    .result(Collections.singletonList(invitationResultDto)).build();
        }
        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

    @Operation(summary = "모바일 청첩장 수정하기", description = "모바일 청첩장을 수정합니다.")
    @Parameter(name = "InvitationRegistDto", description = "id 뻬고 전부 변경 가능. 수정하지 않은 것도 전부 보내주세요")
    @PutMapping("/invitation/{invitationId}")
    public ResponseEntity<BasicResponse> modifyInvitation(@PathVariable Long invitationId, @RequestBody InvitationRegistDto invitationRegistDto) {
        invitationService.modifyInvitation(invitationId, invitationRegistDto);

        BasicResponse basicResponse = BasicResponse.builder()
                .code(HttpStatus.OK.value())
                .httpStatus(HttpStatus.OK)
                .message("청첩장 수정 성공").build();

        return new ResponseEntity<>(basicResponse, basicResponse.getHttpStatus());
    }

}
