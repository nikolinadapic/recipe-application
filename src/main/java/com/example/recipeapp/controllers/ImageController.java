package com.example.recipeapp.controllers;

import com.example.recipeapp.services.ImageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(value = "recipe/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> saveImage(@PathVariable Long id, @RequestParam("image") MultipartFile multipartFile) {
        if (imageService.saveImageFile(id, multipartFile) != null) {
            String response = "Image saved to recipe with ID: " + id;

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>("Recipe with given ID not found. Provided ID: " + id, HttpStatus.NOT_FOUND);
    }

    //add method for getting image from database
}
