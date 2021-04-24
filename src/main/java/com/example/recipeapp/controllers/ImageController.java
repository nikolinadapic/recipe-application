package com.example.recipeapp.controllers;

import com.example.recipeapp.services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("recipe/{id}/image")
    public ResponseEntity<String> saveImage(@PathVariable Long id, @RequestParam("image") MultipartFile multipartFile) {
        if (imageService.saveImageFile(id, multipartFile) != null) {
            String response = "Image saved to recipe with ID: " + id;

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>("Recipe with given ID not found. Provided ID: " + id, HttpStatus.NOT_FOUND);
    }

    //add method for getting image from database
}
