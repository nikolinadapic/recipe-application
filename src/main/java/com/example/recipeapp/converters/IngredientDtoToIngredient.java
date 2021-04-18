package com.example.recipeapp.converters;

import com.example.recipeapp.dto.IngredientDto;
import com.example.recipeapp.model.Ingredient;
import com.example.recipeapp.model.Recipe;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class IngredientDtoToIngredient implements Converter<IngredientDto, Ingredient> {

    private final UnitOfMeasureDtoToUnitOfMeasure unitOfMeasureConverter;

    public IngredientDtoToIngredient(UnitOfMeasureDtoToUnitOfMeasure unitOfMeasureConverter) {
        this.unitOfMeasureConverter = unitOfMeasureConverter;
    }

    @Nullable
    @Override
    public Ingredient convert(IngredientDto ingredientDto) {
        if (ingredientDto == null) {
            return null;
        }

        final Ingredient ingredient = new Ingredient();

        ingredient.setId(ingredientDto.getId());

        /*if (ingredientDto.getRecipe() != null) {
            Recipe recipe = new Recipe();
            recipe.setId(ingredientDto.getRecipeId());
            ingredient.setRecipe(recipe);
            recipe.addIngredient(ingredient);
        }*/

        ingredient.setAmount(ingredientDto.getAmount());
        ingredient.setIngredientName(ingredientDto.getIngredientName());
        ingredient.setUnitOfMeasure(unitOfMeasureConverter.convert(ingredientDto.getUnitOfMeasure()));

        return ingredient;
    }
}
