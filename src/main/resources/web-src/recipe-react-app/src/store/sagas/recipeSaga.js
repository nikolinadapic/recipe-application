import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* fetchSingleRecipeSaga(action) {
    yield put(actions.fetchSingleRecipeStart());
    try {
        const response = yield axios.get('/recipe/' + action.id);
        console.log(response);
        yield put(actions.fetchSingleRecipeSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchSingleRecipeFail(error));
    }
}