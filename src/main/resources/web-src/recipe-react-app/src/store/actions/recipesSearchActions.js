import * as actionTypes from './actionTypes';

export const changeNameSearchInput = (value) => {
    return {
        type: actionTypes.CHANGE_NAME_SEARCH_INPUT,
        value: value
    };
};

export const changeIngredientSearchInput = (value) => {
    return {
        type: actionTypes.CHANGE_INGREDIENT_SEARCH_INPUT,
        value: value
    };
};

export const submitNameSearch = (name) => {
    return {
        type: actionTypes.SUBMIT_NAME_SEARCH,
        name: name
    };
};

export const submitIngredientSearch = (ingredient) => {
    return {
        type: actionTypes.SUBMIT_INGREDIENT_SEARCH,
        ingredient: ingredient
    };
};

export const submitCategoriesSearch = (categoriesParams) => {
    return {
        type: actionTypes.SUBMIT_CATEGORIES_SEARCH,
        categoriesParams: categoriesParams
    };
};

export const submitSearchStart = () => {
    return {
        type: actionTypes.SUBMIT_SEARCH_START
    };
};

export const submitSearchSuccess = (recipes) => {
    return {
        type: actionTypes.SUBMIT_SEARCH_SUCCESS,
        recipes: recipes
    };
};

export const submitSearchFail = () => {
    return {
        type: actionTypes.SUBMIT_SEARCH_FAIL
    };
};

export const exitSearch = () => {
    return {
        type: actionTypes.EXIT_SEARCH
    };
};