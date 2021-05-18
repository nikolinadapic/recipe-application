package com.example.recipeapp.services.implementation;

import com.example.recipeapp.dto.IngredientDto;
import com.example.recipeapp.model.Ingredient;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.repositories.UnitOfMeasureRepository;
import com.example.recipeapp.services.IngredientService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientService {

    private final RecipeRepository recipeRepository;
    private final UnitOfMeasureRepository unitOfMeasureRepository;

    public IngredientServiceImpl(RecipeRepository recipeRepository, UnitOfMeasureRepository unitOfMeasureRepository) {
        this.recipeRepository = recipeRepository;
        this.unitOfMeasureRepository = unitOfMeasureRepository;
    }

    @Override
    public void deleteById(Long recipeId, Long ingredientId) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();

            Optional<Ingredient> ingredientOptional = recipe.getIngredients().stream()
                    .filter(ingredient -> ingredient.getId().equals(ingredientId))
                    .findFirst();

            if (ingredientOptional.isPresent()) {
                Ingredient ingredient = ingredientOptional.get();
                ingredient.setRecipe(null);
                recipe.getIngredients().remove(ingredientOptional.get());
                recipeRepository.save(recipe);
            }
            else {
                System.out.println("Recipe ID is not found. Provided ID: " + recipeId);
            }
        }
    }

    @Override
    public void updateById(Long recipeId, Long ingredientId, IngredientDto ingredientDto) {
        if (ingredientId != null) {
            Optional<Recipe> recipeOptional = recipeRepository.findById(recipeId);
            if (recipeOptional.isPresent()) {
                Recipe recipe = recipeOptional.get();

                Optional<Ingredient> ingredientOptional = recipe.getIngredients().stream()
                        .filter(ingredient -> ingredient.getId().equals(ingredientId))
                        .findFirst();

                if (ingredientOptional.isPresent()) {
                    Ingredient ingredient = ingredientOptional.get();
                    ingredient.setIngredientName(ingredientDto.getIngredientName());
                    ingredient.setAmount(ingredientDto.getAmount());
                    if (unitOfMeasureRepository.findByUnitOfMeasureName(ingredientDto.getUnitOfMeasure().getUnitOfMeasureName()).isPresent()) {
                        ingredient.setUnitOfMeasure(unitOfMeasureRepository.findByUnitOfMeasureName(ingredientDto.getUnitOfMeasure().getUnitOfMeasureName()).get());
                    }
                    recipeRepository.save(recipe);
                } else {
                    System.out.println("Recipe ID is not found. Provided ID: " + recipeId);
                }
            }
        }
    }
}
