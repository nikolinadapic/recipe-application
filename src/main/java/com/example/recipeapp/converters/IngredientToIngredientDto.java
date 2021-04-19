package com.example.recipeapp.converters;

import com.example.recipeapp.dto.IngredientDto;
import com.example.recipeapp.model.Ingredient;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class IngredientToIngredientDto implements Converter<Ingredient, IngredientDto> {

    private final UnitOfMeasureToUnitOfMeasureDto unitOfMeasureConverter;

    public IngredientToIngredientDto(UnitOfMeasureToUnitOfMeasureDto unitOfMeasureConverter) {
        this.unitOfMeasureConverter = unitOfMeasureConverter;
    }

    @Synchronized
    @Nullable
    @Override
    public IngredientDto convert(Ingredient ingredient) {
        if (ingredient == null) {
            return null;
        }

        final IngredientDto ingredientDto = new IngredientDto();

        ingredientDto.setId(ingredient.getId());

        ingredientDto.setAmount(ingredient.getAmount());
        ingredientDto.setIngredientName(ingredient.getIngredientName());
        ingredientDto.setUnitOfMeasure(unitOfMeasureConverter.convert(ingredient.getUnitOfMeasure()));

        return ingredientDto;
    }
}
