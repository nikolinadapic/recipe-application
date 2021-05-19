package com.example.recipeapp.services.implementation;

import com.example.recipeapp.converters.IngredientDtoToIngredient;
import com.example.recipeapp.dto.CategoryDto;
import com.example.recipeapp.dto.IngredientDto;
import com.example.recipeapp.dto.RecipeDto;
import com.example.recipeapp.model.Ingredient;
import com.example.recipeapp.model.Recipe;
import com.example.recipeapp.repositories.CategoryRepository;
import com.example.recipeapp.repositories.IngredientRepository;
import com.example.recipeapp.repositories.RecipeRepository;
import com.example.recipeapp.services.IngredientService;
import com.example.recipeapp.services.RecipeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final CategoryRepository categoryRepository;
    private final IngredientService ingredientService;
    private final IngredientDtoToIngredient ingredientConverter;

    public RecipeServiceImpl(RecipeRepository recipeRepository,
                             IngredientRepository ingredientRepository,
                             CategoryRepository categoryRepository,
                             IngredientService ingredientService,
                             IngredientDtoToIngredient ingredientConverter) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientService = ingredientService;
        this.ingredientConverter = ingredientConverter;
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
    public Recipe saveRecipe(Recipe recipe) {;
        return recipeRepository.save(recipe);
    }

    @Override
    public Recipe updateRecipeFields(Recipe recipe, RecipeDto recipeDto) {
        if (!recipe.getRecipeName().equals(recipeDto.getRecipeName())) {
            recipe.setRecipeName(recipeDto.getRecipeName());
        }
        if (!recipe.getPreparationTime().equals(recipeDto.getPreparationTime())) {
            recipe.setPreparationTime(recipeDto.getPreparationTime());
        }
        if (!recipe.getCookingTime().equals(recipeDto.getCookingTime())) {
            recipe.setCookingTime(recipeDto.getCookingTime());
        }
        if (!recipe.getServings().equals(recipeDto.getServings())) {
            recipe.setServings(recipeDto.getServings());
        }
        if (!recipe.getSourceUrl().equals(recipeDto.getSourceUrl())) {
            recipe.setSourceUrl(recipeDto.getSourceUrl());
        }
        if (!recipe.getDirections().equals(recipeDto.getDirections())) {
            recipe.setDirections(recipeDto.getDirections());
        }
        if (!recipe.getDifficulty().equals(recipeDto.getDifficulty())) {
            recipe.setDifficulty(recipeDto.getDifficulty());
        }
        if (!recipe.getNotes().getNotes().equals(recipeDto.getNotes().getNotes())) {
            recipe.getNotes().setNotes(recipeDto.getNotes().getNotes());
        }
        if (recipe.getIngredients().size() != recipeDto.getIngredients().size()) {
            Set<Long> ingredientIds = new HashSet<>();
            for (Ingredient ingredient : recipe.getIngredients()) {
                ingredientIds.add(ingredient.getId());
            }
            for (Long id : ingredientIds) {
                ingredientService.deleteById(recipe.getId(), id);
                ingredientRepository.deleteById(id);
            }
            recipe.setIngredients(new HashSet<>());
            for (IngredientDto ingredientDto : recipeDto.getIngredients()) {
                recipe.addIngredient(ingredientConverter.convert(ingredientDto));
            }
        }
        if (recipe.getIngredients().size() == recipeDto.getIngredients().size()) {
            Set<Long> ingredientIds = new HashSet<>();
            for (Ingredient ingredient : recipe.getIngredients()) {
                ingredientIds.add(ingredient.getId());
            }
            HashMap<Integer, IngredientDto> ingredientDtoHashMap = new HashMap<>();
            Integer i = 0;
            for (IngredientDto ingredientDto : recipeDto.getIngredients()) {
                ingredientDtoHashMap.put(++i, ingredientDto);
            }
            Integer j = 0;
            for (Long id : ingredientIds) {
                ingredientService.updateById(recipe.getId(), id, ingredientDtoHashMap.get(++j));
            }
        }
        recipe.setCategories(new HashSet<>());
        for (CategoryDto categoryDto : recipeDto.getCategories()) {
            if (categoryRepository.findByCategoryName(categoryDto.getCategoryName()).isPresent()) {
                recipe.getCategories().add(categoryRepository.findByCategoryName(categoryDto.getCategoryName()).get());
            }
        }

        return recipe;
    }

    @Override
    public Set<Recipe> getRecipesByName(String recipeName) {
        if (recipeRepository.findAllByRecipeNameIgnoreCase(recipeName).isPresent()) {
            return recipeRepository.findAllByRecipeNameIgnoreCase(recipeName).get();
        }
        return null;
    }

    @Override
    public Set<Recipe> getRecipesByCategoryName(String categoryName) {
        if (recipeRepository.findAllByCategories_CategoryName(categoryName).isPresent()) {
            return recipeRepository.findAllByCategories_CategoryName(categoryName).get();
        }
        return null;
    }

    @Override
    public Set<Recipe> getRecipesByIngredientName(String ingredientName) {
        if (recipeRepository.findAllByIngredients_IngredientNameIgnoreCase(ingredientName).isPresent()) {
            return recipeRepository.findAllByIngredients_IngredientNameIgnoreCase(ingredientName).get();
        }
        return null;
    }
}
