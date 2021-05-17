import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* deleteRecipeSaga(action) {
    yield put(actions.deleteRecipeStart());
    try {
        const response = yield axios.delete('/recipe/' + action.id);
        console.log(response);
        yield put(actions.deleteRecipeSuccess());
    } catch (error) {
        yield put(actions.deleteRecipeFail());
    }
}