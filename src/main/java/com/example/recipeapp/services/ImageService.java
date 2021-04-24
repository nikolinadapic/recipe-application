package com.example.recipeapp.services;

import com.example.recipeapp.model.Recipe;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    Recipe saveImageFile(Long recipeId, MultipartFile multipartFile);
}
