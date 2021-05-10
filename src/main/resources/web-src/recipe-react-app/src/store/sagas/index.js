import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import { fetchAllRecipesSaga } from './recipesSaga';

export function* watchFetchAllRecipes() {
    yield takeEvery(actionTypes.FETCH_ALL_RECIPES, fetchAllRecipesSaga);
}