package com.example.recipeapp.services;

import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Recipe;

import java.util.Set;

public interface RecipeService {

    Set<Recipe> getRecipes();

    Recipe findById(Long id);

    void deleteById(Long id);

    Recipe saveRecipe(Recipe recipe);

    Recipe updateRecipeFields(Recipe recipe, RecipeDto recipeDto);
}
