package com.ssafy.backend.domain.tipBox.service;

import com.ssafy.backend.domain.tipBox.TipBox;
import com.ssafy.backend.domain.tipBox.TipCode;
import com.ssafy.backend.domain.tipBox.dto.TipBoxResultDto;
import com.ssafy.backend.domain.tipBox.repository.TipBoxRepository;
import com.ssafy.backend.domain.tipBox.repository.TipCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TipBoxService {
    private final TipBoxRepository tipBoxRepository;
    private final TipCodeRepository tipCodeRepository;

    public TipBoxResultDto getTipBox(int leftDay) {
        TipCode tipCode = tipCodeRepository.findByLeftDay(leftDay);
        // 팁박스에서 컨텐츠만 뽑아서 리스트 반복안하게 리팩 가능함
        List<TipBox> tipBoxList = tipBoxRepository.findAllByTipCodeId(tipCode.getId());
        List<String> contents = new ArrayList<>();
        // 스트림으로 리팩가능 숙제에요
        for(TipBox tipBox : tipBoxList){
            contents.add(tipBox.getContent());
        }

        return new TipBoxResultDto(leftDay, tipCode.getTitle(), contents, tipCode.getImage());

    }
}
