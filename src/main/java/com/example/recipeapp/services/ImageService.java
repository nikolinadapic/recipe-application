package com.example.recipeapp.services;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    Byte[] saveImageFile(Long recipeId, MultipartFile multipartFile);
}
