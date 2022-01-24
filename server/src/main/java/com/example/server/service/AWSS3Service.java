package com.example.server.service;

import org.springframework.web.multipart.MultipartFile;

public interface AWSS3Service {

	String uploadFile(MultipartFile multipartFile);

	byte[] downloadFile(String keyName);
}
