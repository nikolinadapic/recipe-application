import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: false
};

const deleteRecipeStart = (state, action) => {
    return { ...state,
        loading: true
    }
};

const deleteRecipeSuccess = (state, action) => {
    return { ...state,
        loading: false,
        error: false
    }
};

const deleteRecipeFail = (state, action) => {
    return { ...state,
        loading: false,
        error: true
    }
};

const deleteRecipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DELETE_RECIPE_START:
            return deleteRecipeStart(state, action);
        
        case actionTypes.DELETE_RECIPE_SUCCESS:
            return deleteRecipeSuccess(state, action);
        
        case actionTypes.DELETE_RECIPE_FAIL:
            return deleteRecipeFail(state, action);
        
        default:
            return state;
    }
};

export default deleteRecipeReducer;