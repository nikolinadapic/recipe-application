package com.example.recipeapp.converters;

import com.example.recipeapp.dto.UnitOfMeasureDto;
import com.example.recipeapp.model.UnitOfMeasure;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class UnitOfMeasureToUnitOfMeasureDto implements Converter<UnitOfMeasure, UnitOfMeasureDto> {

    @Synchronized
    @Nullable
    @Override
    public UnitOfMeasureDto convert(UnitOfMeasure unitOfMeasure) {
        if (unitOfMeasure == null) {
            return null;
        }

        final UnitOfMeasureDto unitOfMeasureDto = new UnitOfMeasureDto();
        unitOfMeasureDto.setId(unitOfMeasure.getId());
        unitOfMeasureDto.setUnitOfMeasureName(unitOfMeasure.getUnitOfMeasureName());

        return unitOfMeasureDto;
    }
}
