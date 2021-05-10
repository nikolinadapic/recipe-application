import * as actionTypes from './actionTypes';

export const fetchSingleRecipe = (id) => {
    return {
        type: actionTypes.FETCH_SINGLE_RECIPE,
        id: id
    };
};

export const fetchSingleRecipeStart = () => {
    return {
        type: actionTypes.FETCH_SINGLE_RECIPE_START
    };
};

export const fetchSingleRecipeSuccess = (recipe) => {
    return {
        type: actionTypes.FETCH_SINGLE_RECIPE_SUCCESS,
        recipe: recipe
    };
};

export const fetchSingleRecipeFail = () => {
    return {
        type: actionTypes.FETCH_SINGLE_RECIPE_FAIL
    };
};