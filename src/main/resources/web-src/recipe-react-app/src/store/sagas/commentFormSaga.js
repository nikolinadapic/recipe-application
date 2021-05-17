import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';
import * as actions from '../actions/index';

export function* submitCommentSaga(action) {
    yield put(actions.submitCommentStart());
    try {
        const response = yield axios.put('/recipe/' + action.id + '/comment', action.commentFormData);
        console.log(response);
        yield put(actions.submitCommentSuccess());
        yield put(actions.fetchSingleRecipe(action.id));
    } catch (error) {
        yield put(actions.submitCommentFail(error));
    }
}