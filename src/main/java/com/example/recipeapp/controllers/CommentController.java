package com.example.recipeapp.controllers;

import com.example.recipeapp.converters.RecipeToRecipeDto;
import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class CommentController {

    private final CommentService commentService;
    private final RecipeToRecipeDto recipeConverter;

    public CommentController(CommentService commentService, RecipeToRecipeDto recipeConverter) {
        this.commentService = commentService;
        this.recipeConverter = recipeConverter;
    }

    @PutMapping("recipe/{id}/comment")
    public ResponseEntity<RecipeDto> commentRecipe(@RequestBody CommentDto commentDto,
                                                  @PathVariable Long id,
                                                  BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(objectError -> {
                System.out.println(objectError.toString());
                throw new RuntimeException(bindingResult.toString());
            });
        }

        Recipe updatedRecipe = commentService.addComment(id, commentDto);
        RecipeDto updatedRecipeDto = recipeConverter.convert(updatedRecipe);

        return new ResponseEntity<>(updatedRecipeDto, HttpStatus.NO_CONTENT);
    }
}
