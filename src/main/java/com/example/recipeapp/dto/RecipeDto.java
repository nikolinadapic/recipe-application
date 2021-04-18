package com.example.recipeapp.dto;

import com.example.recipeapp.model.Difficulty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class RecipeDto {

    private Long id;
    private String recipeName;
    private Integer preparationTime;
    private Integer cookingTime;
    private Integer servings;
    private String sourceUrl;
    private String directions;
    private Difficulty difficulty;
    private NotesDto notes;
    private Set<CommentDto> comments = new HashSet<>();
    private Set<IngredientDto> ingredients = new HashSet<>();
    private Set<CategoryDto> categories = new HashSet<>();
}
