import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* submitRecipeSaga(action) {
    yield put(actions.submitRecipeStart());
    try {
        const response = yield axios.post('/recipe/new', action.recipeFormData);
        console.log(response);
        yield put(actions.submitRecipeSuccess(response));
        yield put(actions.resetIngredients());
    } catch (error) {
        yield put(actions.submitRecipeFail(error));
    }
}