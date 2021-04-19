package com.example.recipeapp.services.implementation;

import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.services.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageServiceImpl implements ImageService {

    private final RecipeRepository recipeRepository;

    public ImageServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    @Transactional
    public Byte[] saveImageFile(Long recipeId, MultipartFile multipartFile) {
        Byte[] byteObjects = new Byte[0];

        try {
            if (recipeRepository.findById(recipeId).isPresent()) {
                Recipe recipe = recipeRepository.findById(recipeId).get();

                byteObjects = new Byte[multipartFile.getBytes().length];

                int i = 0;
                for (byte b : multipartFile.getBytes()) {
                    byteObjects[i++] = b;
                }

                recipe.setImage(byteObjects);

                recipeRepository.save(recipe);

                return byteObjects;
            }
        } catch (IOException e) {
            System.out.println("Error occurred while trying to save image file.");
            e.printStackTrace();
        }

        return byteObjects;
    }
}