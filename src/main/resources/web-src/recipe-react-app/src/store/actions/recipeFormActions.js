import * as actionTypes from './actionTypes';

export const changeRecipeInput = (value, inputIdentifier) => {
    return {
        type: actionTypes.CHANGE_RECIPE_INPUT,
        value: value,
        inputIdentifier: inputIdentifier
    };
};

export const selectCategory = (inputIdentifier) => {
    return {
        type: actionTypes.SELECT_CATEGORY,
        inputIdentifier: inputIdentifier
    };
};

export const submitRecipe = (recipeFormData) => {
    return {
        type: actionTypes.SUBMIT_RECIPE,
        recipeFormData: recipeFormData
    };
};

export const submitRecipeStart = () => {
    return {
        type: actionTypes.SUBMIT_RECIPE_START
    };
};

export const submitRecipeSuccess = () => {
    return {
        type: actionTypes.SUBMIT_RECIPE_SUCCESS
    };
};

export const submitRecipeFail = (error) => {
    return {
        type: actionTypes.SUBMIT_RECIPE_FAIL,
        error: error
    };
};