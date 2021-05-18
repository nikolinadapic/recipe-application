package com.example.recipeapp.services;

import com.example.recipeapp.dto.IngredientDto;

public interface IngredientService {

    void deleteById(Long recipeId, Long ingredientId);
    void updateById(Long recipeId, Long ingredientId, IngredientDto ingredientDto);
}
