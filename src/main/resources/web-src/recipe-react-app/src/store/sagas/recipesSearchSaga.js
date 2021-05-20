import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* submitNameSearchSaga(action) {
    yield put(actions.submitSearchStart());
    try {
        const response = yield axios.get('/recipe/name-search/' + action.name);
        const allRecipes = response.data;
        console.log(response);
        const updatedRecipes = allRecipes.map(recipe => {
            return {
                ...recipe
            }
        });
        yield put(actions.submitSearchSuccess(updatedRecipes));
    } catch (error) {
        yield put(actions.submitSearchFail(error));
    }
}

export function* submitIngredientSearchSaga(action) {
    yield put(actions.submitSearchStart());
    try {
        const response = yield axios.get('/recipe/ingredient-search/' + action.ingredient);
        const allRecipes = response.data;
        console.log(response);
        const updatedRecipes = allRecipes.map(recipe => {
            return {
                ...recipe
            }
        });
        yield put(actions.submitSearchSuccess(updatedRecipes));
    } catch (error) {
        yield put(actions.submitSearchFail(error));
    }
}

export function* submitCategoriesSearchSaga(action) {
    yield put(actions.submitSearchStart());
    try {
        const response = yield axios.get('/recipe/category-search' + action.categoriesParams);
        const allRecipes = response.data;
        console.log(response);
        const updatedRecipes = allRecipes.map(recipe => {
            return {
                ...recipe
            }
        });
        yield put(actions.submitSearchSuccess(updatedRecipes));
    } catch (error) {
        yield put(actions.submitSearchFail(error));
    }
}