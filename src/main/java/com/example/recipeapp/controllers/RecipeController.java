package com.example.recipeapp.controllers;

import com.example.recipeapp.converters.RecipeToRecipeDto;
import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Ingredient;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@Controller
public class RecipeController {

    private final RecipeService recipeService;
    private final RecipeToRecipeDto recipeConverter;

    public RecipeController(RecipeService recipeService, RecipeToRecipeDto recipeConverter) {
        this.recipeService = recipeService;
        this.recipeConverter = recipeConverter;
    }

    private Recipe updateRecipeFields(Recipe recipe, RecipeDto recipeDto) {
        if (!recipe.getRecipeName().equals(recipeDto.getRecipeName())) {
            recipe.setRecipeName(recipeDto.getRecipeName());
        }
        if (!recipe.getPreparationTime().equals(recipeDto.getPreparationTime())) {
            recipe.setPreparationTime(recipeDto.getPreparationTime());
        }
        if (!recipe.getCookingTime().equals(recipeDto.getCookingTime())) {
            recipe.setCookingTime(recipeDto.getCookingTime());
        }
        if (!recipe.getServings().equals(recipeDto.getServings())) {
            recipe.setServings(recipeDto.getServings());
        }
        if (!recipe.getSourceUrl().equals(recipeDto.getSourceUrl())) {
            recipe.setSourceUrl(recipeDto.getSourceUrl());
        }
        if (!recipe.getDirections().equals(recipeDto.getDirections())) {
            recipe.setDirections(recipeDto.getDirections());
        }
        if (!recipe.getDifficulty().equals(recipeDto.getDifficulty())) {
            recipe.setDifficulty(recipeDto.getDifficulty());
        }
        if (!recipe.getNotes().getNotes().equals(recipeDto.getNotes().getNotes())) {
            recipe.getNotes().setNotes(recipeDto.getNotes().getNotes());
        }
        //add for ingredients and categories

        return recipe;
    }

    @GetMapping("recipe")
    public ResponseEntity<Set<RecipeDto>> getAllRecipes() {
        Set<RecipeDto> recipeDtoSet = new HashSet<>();

        for (Recipe recipe : recipeService.getRecipes()) {
            RecipeDto recipeDto = recipeConverter.convert(recipe);
            recipeDtoSet.add(recipeDto);
        }

        return new ResponseEntity<>(recipeDtoSet, HttpStatus.OK);
    }

    @PostMapping("recipe")
    public ResponseEntity<String> createRecipe(@RequestBody RecipeDto recipeDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors().forEach(objectError -> {
                System.out.println(objectError.toString());
                throw new RuntimeException(bindingResult.toString());
            });
        }

        RecipeDto savedRecipeDto = recipeService.saveRecipeDto(recipeDto);

        String response = "/recipe/" + savedRecipeDto.getId();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("recipe/{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable Long id) {
        return new ResponseEntity<>(recipeConverter.convert(recipeService.findById(id)), HttpStatus.OK);
    }

    @PutMapping("recipe/{id}")
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
        Recipe updatedRecipe = updateRecipeFields(recipe, recipeDto);
        RecipeDto updatedRecipeDto = recipeConverter.convert(updatedRecipe);
        RecipeDto savedRecipeDto = recipeService.saveRecipeDto(updatedRecipeDto);

        return new ResponseEntity<>(savedRecipeDto, HttpStatus.OK);
    }

    @DeleteMapping("recipe/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteById(id);
        String response = "Deleted recipe with ID: " + id;

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
