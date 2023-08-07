package com.ssafy.backend.global.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.domain.common.FileUploadResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public FileUploadResponse uploadFiles(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("Error: MultipartFile -> File로 전환이 실패했습니다."));
        return upload(uploadFile, dirName);
    }

    public FileUploadResponse upload(File uploadFile, String filePath) {
        String fileName = filePath + "/" + generateUniqueFileName(uploadFile.getName()); // S3에 저장된 파일 이름
        String uploadImageUrl = putS3(uploadFile, fileName); // S3로 업로드
        log.info("uploadImageUrl = " + uploadImageUrl);
        removeNewFile(uploadFile);

        //사용자의 프로필을 등록하는 것이기때문에, User 도메인에 setImageUrl을 해주는 코드.
        //이 부분은 그냥 업로드만 필요하다면 필요없는 부분이다.
//        User user = userRepository.findById(userId).orElseThrow(NullPointerException::new);
//        user.setImageUrl(uploadImageUrl); // dirtyChecking으로 변경사항 DB반영

        //FileUploadResponse DTO로 반환해준다.
        return new FileUploadResponse(fileName, uploadImageUrl);
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(
                CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(MultipartFile file) throws IOException {
        String targetDirectoryPath = System.getProperty("user.dir") + "/temp/";

        File targetDirectory = new File(targetDirectoryPath);
        if (!targetDirectory.exists()) {
            if (!targetDirectory.mkdirs()) {
                // 디렉토리 생성에 실패한 경우
                throw new IOException("Failed to create target directory: " + targetDirectoryPath);
            }
        }

        File convertFile = new File(targetDirectory, Objects.requireNonNull(file.getOriginalFilename(), "파일명이 없습니다."));
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

    public String generateUniqueFileName(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        String name = filename.substring(0, lastDotIndex);
        String extension = filename.substring(lastDotIndex);
        return name + "_" + UUID.randomUUID() + extension;
    }
}
