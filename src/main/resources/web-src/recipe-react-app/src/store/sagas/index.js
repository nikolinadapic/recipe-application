import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchAllRecipesSaga } from './recipesSaga';
import { fetchSingleRecipeSaga } from './recipeSaga';
import { submitRecipeSaga } from './recipeFormSaga';
import { submitCommentSaga } from './commentFormSaga';

export function* watchFetchAllRecipes() {
    yield takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchAllRecipesSaga);
}

export function* watchFetchSingleRecipe() {
    yield takeEvery(actionTypes.FETCH_SINGLE_RECIPE, fetchSingleRecipeSaga);
}

export function* watchSubmitRecipe() {
    yield takeEvery(actionTypes.SUBMIT_RECIPE, submitRecipeSaga);
}

export function* watchSubmitComment() {
    yield takeEvery(actionTypes.SUBMIT_COMMENT, submitCommentSaga);
}