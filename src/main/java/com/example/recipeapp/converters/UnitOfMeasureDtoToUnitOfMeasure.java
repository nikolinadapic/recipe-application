package com.example.recipeapp.converters;

import com.example.recipeapp.dto.UnitOfMeasureDto;
import com.example.recipeapp.model.UnitOfMeasure;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class UnitOfMeasureDtoToUnitOfMeasure implements Converter<UnitOfMeasureDto, UnitOfMeasure> {

    @Synchronized
    @Nullable
    @Override
    public UnitOfMeasure convert(UnitOfMeasureDto unitOfMeasureDto) {
        if (unitOfMeasureDto == null) {
            return null;
        }

        final UnitOfMeasure unitOfMeasure = new UnitOfMeasure();

        unitOfMeasure.setId(unitOfMeasureDto.getId());
        unitOfMeasure.setUnitOfMeasureName(unitOfMeasureDto.getUnitOfMeasureName());

        return unitOfMeasure;
    }
}
