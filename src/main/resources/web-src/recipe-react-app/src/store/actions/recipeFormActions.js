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

export const submitRecipeSuccess = (response) => {
    return {
        type: actionTypes.SUBMIT_RECIPE_SUCCESS,
        response: response
    };
};

export const submitRecipeFail = (error) => {
    return {
        type: actionTypes.SUBMIT_RECIPE_FAIL,
        error: error
    };
};

export const resetRecipeForm = () => {
    return {
        type: actionTypes.RESET_RECIPE_FORM
    };
};

export const updateRecipeForm = (id, currentData) => {
    return {
        type: actionTypes.UPDATE_RECIPE_FORM,
        id: id,
        currentData: currentData
    };
};

export const submitRecipeUpdate = (id, recipeFormData) => {
    return {
        type: actionTypes.SUBMIT_RECIPE_UPDATE,
        id: id,
        recipeFormData: recipeFormData
    };
};

export const submitRecipeUpdateStart = () => {
    return {
        type: actionTypes.SUBMIT_RECIPE_UPDATE_START
    };
};

export const submitRecipeUpdateSuccess = () => {
    return {
        type: actionTypes.SUBMIT_RECIPE_UPDATE_SUCCESS
    };
};

export const submitRecipeUpdateFail = (error) => {
    return {
        type: actionTypes.SUBMIT_RECIPE_UPDATE_FAIL,
        error: error
    };
};