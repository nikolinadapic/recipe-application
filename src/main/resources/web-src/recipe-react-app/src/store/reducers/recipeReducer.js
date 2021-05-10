import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipe: null,
    loading: false,
    error: false
};

const fetchSingleRecipeStart = (state, action) => {
    return { ...state,
        loading: true
    }
};

const fetchSingleRecipeSuccess = (state, action) => {
    return { ...state,
        recipe: { ...action.recipe },
        loading: false,
        error: false
    }
};

const fetchSingleRecipeFail = (state, action) => {
    return { ...state,
        loading: false,
        error: true
    }
};

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SINGLE_RECIPE_START:
            return fetchSingleRecipeStart(state, action);
        
        case actionTypes.FETCH_SINGLE_RECIPE_SUCCESS:
            return fetchSingleRecipeSuccess(state, action);
        
        case actionTypes.FETCH_SINGLE_RECIPE_FAIL:
            return fetchSingleRecipeFail(state, action);
        
        default:
            return state;
    }
};

export default recipeReducer;