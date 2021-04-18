package com.example.recipeapp.services.implementation;

import com.example.recipeapp.converters.RecipeDtoToRecipe;
import com.example.recipeapp.converters.RecipeToRecipeDto;
import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.services.RecipeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeDtoToRecipe recipeDtoToRecipe;
    private final RecipeToRecipeDto recipeToRecipeDto;

    public RecipeServiceImpl(RecipeRepository recipeRepository,
                             RecipeDtoToRecipe recipeDtoToRecipe,
                             RecipeToRecipeDto recipeToRecipeDto) {
        this.recipeRepository = recipeRepository;
        this.recipeDtoToRecipe = recipeDtoToRecipe;
        this.recipeToRecipeDto = recipeToRecipeDto;
    }

    @Override
    public Set<Recipe> getRecipes() {
        Set<Recipe> recipes = new HashSet<>();
        recipeRepository.findAll().iterator().forEachRemaining(recipes::add);
        return recipes;
    }

    @Override
    public Recipe findById(Long id) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isEmpty()) {
            throw new RuntimeException("Recipe with given ID is not found. Provided ID: " + id.toString());
        }
        return recipeOptional.get();
    }

    @Override
    public void deleteById(Long id) {
        recipeRepository.deleteById(id);
    }

    @Override
    @Transactional
    public RecipeDto saveRecipeDto(RecipeDto recipeDto) {
        Recipe recipe = recipeDtoToRecipe.convert(recipeDto);
        Recipe savedRecipe = recipeRepository.save(recipe);
        return recipeToRecipeDto.convert(savedRecipe);
    }
}
