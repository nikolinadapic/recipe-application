package com.example.recipeapp.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@EqualsAndHashCode(exclude = {"recipe"})
@Entity
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ingredientName;
    private BigDecimal amount;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private UnitOfMeasure unitOfMeasure;

    @ManyToOne
    private Recipe recipe;

    public Ingredient() {}

    public Ingredient(String ingredientName, BigDecimal amount, UnitOfMeasure unitOfMeasure, Recipe recipe) {
        this.ingredientName = ingredientName;
        this.amount = amount;
        this.unitOfMeasure = unitOfMeasure;
        this.recipe = recipe;
    }
}
