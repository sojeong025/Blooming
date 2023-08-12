package com.ssafy.backend.domain.weddingFair.service;

import com.ssafy.backend.domain.weddingFair.WeddingFair;
import com.ssafy.backend.domain.weddingFair.dto.WeddingFairResultDto;
import com.ssafy.backend.domain.weddingFair.repository.WeddingFairRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WeddingFairService {

    private final WeddingFairRepository weddingFairRepository;

    public List<WeddingFairResultDto> getWeddingFair() {
        List<WeddingFair> weddingFairList = weddingFairRepository.findAll();
        return weddingFairList.stream()
                .map(weddingFair -> new WeddingFairResultDto(weddingFair.getThumbnail(), weddingFair.getName(), weddingFair.getDatetime(), weddingFair.getPlace(), weddingFair.getLink()))
                .collect(Collectors.toList());
    }
}
