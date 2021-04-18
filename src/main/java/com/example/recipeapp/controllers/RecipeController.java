package com.example.recipeapp.controllers;

import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping("recipe")
    public ResponseEntity<String> saveOrUpdate(@RequestBody RecipeDto recipeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(objectError -> {
                System.out.println(objectError.toString());
                throw new RuntimeException(bindingResult.toString());
            });
        }

        RecipeDto savedRecipeDto = recipeService.saveRecipeDto(recipeDto);

        String response = "/recipe/";

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
