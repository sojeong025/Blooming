package com.ssafy.backend.domain.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class FileUploadResponse {
    private String fileName;
    private String uploadImageUrl;
}
