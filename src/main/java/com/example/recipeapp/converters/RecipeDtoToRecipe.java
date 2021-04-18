package com.example.recipeapp.converters;

import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Recipe;
import lombok.Synchronized;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class RecipeDtoToRecipe implements Converter<RecipeDto, Recipe> {

    private final CategoryDtoToCategory categoryConverter;
    private final IngredientDtoToIngredient ingredientConverter;
    private final NotesDtoToNotes notesConverter;
    private final CommentDtoToComment commentConverter;

    public RecipeDtoToRecipe(CategoryDtoToCategory categoryConverter,
                             IngredientDtoToIngredient ingredientConverter,
                             NotesDtoToNotes notesConverter,
                             CommentDtoToComment commentConverter) {
        this.categoryConverter = categoryConverter;
        this.ingredientConverter = ingredientConverter;
        this.notesConverter = notesConverter;
        this.commentConverter = commentConverter;
    }

    @Synchronized
    @Nullable
    @Override
    public Recipe convert(RecipeDto recipeDto) {
        if (recipeDto == null) {
            return null;
        }

        final Recipe recipe = new Recipe();

        recipe.setId(recipeDto.getId());
        recipe.setCookingTime(recipeDto.getCookingTime());
        recipe.setPreparationTime(recipeDto.getPreparationTime());
        recipe.setRecipeName(recipeDto.getRecipeName());
        recipe.setDifficulty(recipeDto.getDifficulty());
        recipe.setDirections(recipeDto.getDirections());
        recipe.setServings(recipeDto.getServings());
        recipe.setSourceUrl(recipeDto.getSourceUrl());
        recipe.setNotes(notesConverter.convert(recipeDto.getNotes()));

        if (recipeDto.getComments() != null && recipeDto.getComments().size() > 0) {
            recipeDto.getComments().forEach(
                    commentDto -> recipe.getComments().add(commentConverter.convert(commentDto))
            );
        }

        if (recipeDto.getCategories() != null && recipeDto.getCategories().size() > 0) {
            recipeDto.getCategories().forEach(
                    categoryDto -> recipe.getCategories().add(categoryConverter.convert(categoryDto))
            );
        }

        if (recipeDto.getIngredients() != null && recipeDto.getIngredients().size() > 0) {
            recipeDto.getIngredients().forEach(
                    ingredientDto -> {
                        recipe.getIngredients().add(ingredientConverter.convert(ingredientDto));
                        recipe.getIngredients().forEach(ingredient -> ingredient.setRecipe(recipe));
                    }
            );
        }

        return recipe;
    }
}
