import * as actionTypes from './actionTypes';

export const fetchAllRecipes = () => {
    return {
        type: actionTypes.FETCH_ALL_RECIPES
    };
};

export const fetchAllRecipesStart = () => {
    return {
        type: actionTypes.FETCH_ALL_RECIPES_START
    };
};

export const fetchAllRecipesSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_ALL_RECIPES_SUCCESS,
        recipes: recipes
    };
};

export const fetchAllRecipesFail = () => {
    return {
        type: actionTypes.FETCH_ALL_RECIPES_FAIL
    };
};