package com.ssafy.backend.domain.tipMagazine.service;

import com.ssafy.backend.domain.tipMagazine.TipMagazine;
import com.ssafy.backend.domain.tipMagazine.dto.TipMagazineDetailDto;
import com.ssafy.backend.domain.tipMagazine.dto.TipMagazineListDto;
import com.ssafy.backend.domain.tipMagazine.repository.TipMagazineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TipMagazineService {

    private final TipMagazineRepository tipMagazineRepository;

    public List<TipMagazineListDto> getMagazineList() {
        List<TipMagazine> tipMagazines = tipMagazineRepository.findAll();
        return tipMagazines.stream()
                .map(tipMagazine -> new TipMagazineListDto(tipMagazine.getId(), tipMagazine.getTitle(), tipMagazine.getThumbnail()))
                .collect(Collectors.toList());
    }

    public TipMagazine getMagazineDetail(Long tipMagazineId) {
        TipMagazine tipMagazine = tipMagazineRepository.findById(tipMagazineId)
                .orElse(null);
        return tipMagazine;
    }
}
