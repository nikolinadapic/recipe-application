import * as actionTypes from './actionTypes';

export const changeCommentInput = (value, inputIdentifier) => {
    return {
        type: actionTypes.CHANGE_COMMENT_INPUT,
        value: value,
        inputIdentifier: inputIdentifier
    };
};

export const submitComment = (commentFormData, id) => {
    return {
        type: actionTypes.SUBMIT_COMMENT,
        commentFormData: commentFormData,
        id: id
    };
};

export const submitCommentStart = () => {
    return {
        type: actionTypes.SUBMIT_COMMENT_START
    };
};

export const submitCommentSuccess = () => {
    return {
        type: actionTypes.SUBMIT_COMMENT_SUCCESS
    };
};

export const submitCommentFail = (error) => {
    return {
        type: actionTypes.SUBMIT_COMMENT_FAIL,
        error: error
    };
};