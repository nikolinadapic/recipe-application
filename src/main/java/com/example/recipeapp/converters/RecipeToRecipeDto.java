package com.example.recipeapp.converters;

import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Recipe;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class RecipeToRecipeDto implements Converter<Recipe, RecipeDto> {

    private final CategoryToCategoryDto categoryConverter;
    private final IngredientToIngredientDto ingredientConverter;
    private final NotesToNotesDto notesConverter;
    private final CommentToCommentDto commentConverter;

    public RecipeToRecipeDto(CategoryToCategoryDto categoryConverter,
                             IngredientToIngredientDto ingredientConverter,
                             NotesToNotesDto notesConverter,
                             CommentToCommentDto commentConverter) {
        this.categoryConverter = categoryConverter;
        this.ingredientConverter = ingredientConverter;
        this.notesConverter = notesConverter;
        this.commentConverter = commentConverter;
    }

    @Synchronized
    @Nullable
    @Override
    public RecipeDto convert(Recipe recipe) {
        if (recipe == null) {
            return null;
        }

        final RecipeDto recipeDto = new RecipeDto();

        recipeDto.setId(recipe.getId());
        recipeDto.setCookingTime(recipe.getCookingTime());
        recipeDto.setPreparationTime(recipe.getPreparationTime());
        recipeDto.setRecipeName(recipe.getRecipeName());
        recipeDto.setDifficulty(recipe.getDifficulty());
        recipeDto.setDirections(recipe.getDirections());
        recipeDto.setServings(recipe.getServings());
        recipeDto.setSourceUrl(recipe.getSourceUrl());
        recipeDto.setNotes(notesConverter.convert(recipe.getNotes()));

        if (recipe.getComments() != null && recipe.getComments().size() > 0) {
            recipe.getComments().forEach(
                    comment -> recipeDto.getComments().add(commentConverter.convert(comment))
            );
        }

        if (recipe.getCategories() != null && recipe.getCategories().size() > 0) {
            recipe.getCategories().forEach(
                    category -> recipeDto.getCategories().add(categoryConverter.convert(category))
            );
        }

        if (recipe.getIngredients() != null && recipe.getIngredients().size() > 0) {
            recipe.getIngredients().forEach(
                    ingredient -> recipeDto.getIngredients().add(ingredientConverter.convert(ingredient))
            );
        }

        return recipeDto;
    }
}
