import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchAllRecipesSaga } from './recipesSaga';
import { fetchSingleRecipeSaga } from './recipeSaga';

export function* watchFetchAllRecipes() {
    yield takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchAllRecipesSaga);
}

export function* watchFetchSingleRecipe() {
    yield takeEvery(actionTypes.FETCH_SINGLE_RECIPE, fetchSingleRecipeSaga);
}