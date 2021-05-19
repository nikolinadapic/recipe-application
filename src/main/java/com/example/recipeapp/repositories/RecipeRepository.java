package com.example.recipeapp.repositories;

import com.example.recipeapp.model.Recipe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long> {

    Optional<Set<Recipe>> findAllByRecipeNameIgnoreCase(String recipeName);

    Optional<Set<Recipe>> findAllByCategories_CategoryName(String categoryName);

    Optional<Set<Recipe>> findAllByIngredients_IngredientNameIgnoreCase(String ingredientName);
}
