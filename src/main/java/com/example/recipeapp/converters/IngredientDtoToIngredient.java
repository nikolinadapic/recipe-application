package com.example.recipeapp.converters;

import com.example.recipeapp.dto.IngredientDto;
import com.example.recipeapp.model.Ingredient;
import com.example.recipeapp.repositories.UnitOfMeasureRepository;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class IngredientDtoToIngredient implements Converter<IngredientDto, Ingredient> {

    private final UnitOfMeasureDtoToUnitOfMeasure unitOfMeasureConverter;
    private final UnitOfMeasureRepository unitOfMeasureRepository;

    public IngredientDtoToIngredient(UnitOfMeasureDtoToUnitOfMeasure unitOfMeasureConverter,
                                     UnitOfMeasureRepository unitOfMeasureRepository) {
        this.unitOfMeasureConverter = unitOfMeasureConverter;
        this.unitOfMeasureRepository = unitOfMeasureRepository;
    }

    @Nullable
    @Override
    public Ingredient convert(IngredientDto ingredientDto) {
        if (ingredientDto == null) {
            return null;
        }

        final Ingredient ingredient = new Ingredient();

        ingredient.setId(ingredientDto.getId());

        ingredient.setAmount(ingredientDto.getAmount());
        ingredient.setIngredientName(ingredientDto.getIngredientName());

        if (unitOfMeasureRepository.findByUnitOfMeasureName(ingredientDto.getUnitOfMeasure().getUnitOfMeasureName()).isEmpty()) {
            ingredient.setUnitOfMeasure(unitOfMeasureConverter.convert(ingredientDto.getUnitOfMeasure()));
        } else {
            ingredient.setUnitOfMeasure(unitOfMeasureRepository.findByUnitOfMeasureName(ingredientDto.getUnitOfMeasure().getUnitOfMeasureName()).get());
        }

        return ingredient;
    }
}
