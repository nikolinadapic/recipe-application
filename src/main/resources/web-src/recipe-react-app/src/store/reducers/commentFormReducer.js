import * as actionTypes from '../actions/actionTypes';
import { checkValidity } from '../utility';

const initialState = {
    author: '',
    text: '',
    validComment: false,
    touchedComment: false,
    loading: false,
    error: null
}

const changeCommentInput = (state, action) => {
    return { ...state,
        author: (action.inputIdentifier === 'author') ? action.value : state.author,
        text: (action.inputIdentifier === 'text') ? action.value : state.text,
        validComment: (action.inputIdentifier === 'text') ? checkValidity(action.value, { required: true }) : state.validComment,
        touchedComment: (action.inputIdentifier === 'text') ? true : state.touchedComment
    };
};

const submitCommentStart = (state, action) => {
    return { ...state, loading: true };
};

const submitCommentSuccess = (state, action) => {
    return { ...state,
        error: null,
        loading: false,
        author: initialState.author,
        text: initialState.text,
        validComment: initialState.validComment,
        touchedComment: initialState.touchedComment
    };
};

const submitCommentFail = (state, action) => {
    return { ...state, loading: false, error: action.error };
};

const commentFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_COMMENT_INPUT:
            return changeCommentInput(state, action);
        
        case actionTypes.SUBMIT_COMMENT_START:
            return submitCommentStart(state, action);
        
        case actionTypes.SUBMIT_COMMENT_SUCCESS:
            return submitCommentSuccess(state, action);
        
        case actionTypes.SUBMIT_COMMENT_FAIL:
            return submitCommentFail(state, action);
        
        default:
            return state;
    }
};

export default commentFormReducer;