import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchAllRecipesSaga } from './recipesSaga';
import { fetchSingleRecipeSaga } from './recipeSaga';
import { submitRecipeSaga, submitRecipeUpdateSaga } from './recipeFormSaga';
import { submitCommentSaga } from './commentFormSaga';
import { deleteRecipeSaga } from './deleteRecipeSaga';
import { submitCategoriesSearchSaga, submitIngredientSearchSaga, submitNameSearchSaga } from './recipesSearchSaga';

export function* watchFetchAllRecipes() {
    yield takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchAllRecipesSaga);
}

export function* watchFetchSingleRecipe() {
    yield takeEvery(actionTypes.FETCH_SINGLE_RECIPE, fetchSingleRecipeSaga);
}

export function* watchSubmitRecipe() {
    yield takeEvery(actionTypes.SUBMIT_RECIPE, submitRecipeSaga);
}

export function* watchSubmitRecipeUpdate() {
    yield takeEvery(actionTypes.SUBMIT_RECIPE_UPDATE, submitRecipeUpdateSaga);
}

export function* watchSubmitComment() {
    yield takeEvery(actionTypes.SUBMIT_COMMENT, submitCommentSaga);
}

export function* watchDeleteRecipe() {
    yield takeEvery(actionTypes.DELETE_RECIPE, deleteRecipeSaga);
}

export function* watchSubmitNameSearch() {
    yield takeEvery(actionTypes.SUBMIT_NAME_SEARCH, submitNameSearchSaga);
}

export function* watchSubmitIngredientSearch() {
    yield takeEvery(actionTypes.SUBMIT_INGREDIENT_SEARCH, submitIngredientSearchSaga);
}

export function* watchSubmitCategoriesSearch() {
    yield takeEvery(actionTypes.SUBMIT_CATEGORIES_SEARCH, submitCategoriesSearchSaga);
}