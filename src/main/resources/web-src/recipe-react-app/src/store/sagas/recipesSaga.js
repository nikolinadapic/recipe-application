import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* fetchAllRecipesSaga(action) {
    yield put(actions.fetchAllRecipesStart());
    try {
        const response = yield axios.get('/recipe');
        const allRecipes = response.data;
        console.log(response);
        const updatedRecipes = allRecipes.map(recipe => {
            return {
                ...recipe
            }
        });
        yield put(actions.fetchAllRecipesSuccess(updatedRecipes));
    } catch (error) {
        yield put(actions.fetchAllRecipesFail(error));
    }
}