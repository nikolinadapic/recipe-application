package com.example.recipeapp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class IngredientDto {

    private Long id;
    private String ingredientName;
    private BigDecimal amount;
    private UnitOfMeasureDto unitOfMeasure;
}
