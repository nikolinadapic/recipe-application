import * as actionTypes from './actionTypes';

export const addIngredient = () => {
    return {
        type: actionTypes.ADD_INGREDIENT
    }
};

export const removeIngredient = (index) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        index: index
    };
};

export const changeIngredientInput = (index, value, inputIdentifier) => {
    return {
        type: actionTypes.CHANGE_INGREDIENT_INPUT,
        index: index,
        value: value,
        inputIdentifier: inputIdentifier
    };
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    };
};