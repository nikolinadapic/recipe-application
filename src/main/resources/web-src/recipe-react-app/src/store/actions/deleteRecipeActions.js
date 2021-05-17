import * as actionTypes from './actionTypes';

export const deleteRecipe = (id) => {
    return {
        type: actionTypes.DELETE_RECIPE,
        id: id
    };
};

export const deleteRecipeStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE_START
    };
};

export const deleteRecipeSuccess = () => {
    return {
        type: actionTypes.DELETE_RECIPE_SUCCESS
    };
};

export const deleteRecipeFail = () => {
    return {
        type: actionTypes.DELETE_RECIPE_FAIL
    };
};