package com.example.recipeapp.controllers;

import com.example.recipeapp.converters.CommentToCommentDto;
import com.example.recipeapp.converters.RecipeDtoToRecipe;
import com.example.recipeapp.converters.RecipeToRecipeDto;
import com.example.recipeapp.dto.CommentDto;
import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Comment;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.services.CommentService;
import com.example.recipeapp.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
public class RecipeController {

    private final RecipeService recipeService;
    private final CommentService commentService;
    private final RecipeToRecipeDto recipeToRecipeDto;
    private final RecipeDtoToRecipe recipeDtoToRecipe;
    private final CommentToCommentDto commentConverter;

    public RecipeController(RecipeService recipeService,
                            CommentService commentService,
                            RecipeToRecipeDto recipeToRecipeDto,
                            RecipeDtoToRecipe recipeDtoToRecipe,
                            CommentToCommentDto commentConverter) {
        this.recipeService = recipeService;
        this.commentService = commentService;
        this.recipeToRecipeDto = recipeToRecipeDto;
        this.recipeDtoToRecipe = recipeDtoToRecipe;
        this.commentConverter = commentConverter;
    }

    List<CommentDto> orderComments(Long eventId) {
        List<CommentDto> commentDtoList = new ArrayList<>();
        for (Comment comment : commentService.getOrderedComments(eventId)) {
            commentDtoList.add(commentConverter.convert(comment));
        }

        return commentDtoList;
    }

    @GetMapping("recipe")
    public ResponseEntity<Set<RecipeDto>> getAllRecipes() {
        Set<RecipeDto> recipeDtoSet = new HashSet<>();

        for (Recipe recipe : recipeService.getRecipes()) {
            RecipeDto recipeDto = recipeToRecipeDto.convert(recipe);
            recipeDtoSet.add(recipeDto);
        }

        return new ResponseEntity<>(recipeDtoSet, HttpStatus.OK);
    }

    @PostMapping("recipe/new")
    public ResponseEntity<String> createRecipe(@RequestBody RecipeDto recipeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(objectError -> {
                System.out.println(objectError.toString());
                throw new RuntimeException(bindingResult.toString());
            });
        }

        Recipe recipe = recipeService.saveRecipe(recipeDtoToRecipe.convert(recipeDto));

        String response = recipe.getId().toString();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("recipe/{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable Long id) {
        RecipeDto recipeDto = recipeToRecipeDto.convert(recipeService.findById(id));
        recipeDto.setComments(orderComments(id));

        return new ResponseEntity<>(recipeDto, HttpStatus.OK);
    }

    @PutMapping("recipe/{id}/update")
    public ResponseEntity<RecipeDto> updateRecipe(@RequestBody RecipeDto recipeDto,
                                                  @PathVariable Long id,
                                                  BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(objectError -> {
                System.out.println(objectError.toString());
                throw new RuntimeException(bindingResult.toString());
            });
        }

        Recipe recipe = recipeService.findById(id);
        Recipe updatedRecipe = recipeService.updateRecipeFields(recipe, recipeDto);
        Recipe savedRecipe = recipeService.saveRecipe(updatedRecipe);

        RecipeDto savedRecipeDto = recipeToRecipeDto.convert(savedRecipe);

        return new ResponseEntity<>(savedRecipeDto, HttpStatus.OK);
    }

    @DeleteMapping("recipe/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteById(id);
        String response = "Deleted recipe with ID: " + id;

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
