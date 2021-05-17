package com.example.recipeapp.controllers;

import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.services.RecipeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.net.URI;

@CrossOrigin(origins = {"http://localhost:3000"}, exposedHeaders = {"Content-Disposition"})
@RestController
public class ImageController {

    private final RecipeService recipeService;
    private final RecipeRepository recipeRepository;

    public ImageController(RecipeService recipeService, RecipeRepository recipeRepository) {
        this.recipeService = recipeService;
        this.recipeRepository = recipeRepository;
    }

    @PostMapping(value = "recipe/{id}/image")
    public ResponseEntity<Void> saveImage(@PathVariable Long id,@NotNull @RequestParam("image") MultipartFile multipartFile) throws IOException {
        if (recipeService.findById(id) != null) {
            Recipe recipe = recipeService.findById(id);
            recipe.setImageName(multipartFile.getOriginalFilename());
            recipe.setImageContentType(multipartFile.getContentType());
            recipe.setImageData(multipartFile.getBytes());
            recipeRepository.save(recipe);

            URI location = ServletUriComponentsBuilder.fromCurrentRequest().build().toUri();

            return ResponseEntity.created(location).build();
        }
        return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("recipe/{id}/recipeimage")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        if (recipeService.findById(id) != null) {
            Recipe recipe = recipeService.findById(id);

            HttpHeaders header = new HttpHeaders();
            if (recipe.getImageData() != null) {
                header.setContentType(MediaType.valueOf(recipe.getImageContentType()));
                header.setContentLength(recipe.getImageData().length);
                header.set("Content-Disposition", "attachment; filename=" + recipe.getImageName());

                return new ResponseEntity<>(recipe.getImageData(), header, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
