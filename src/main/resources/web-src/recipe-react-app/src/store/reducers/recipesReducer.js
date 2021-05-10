import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipes: [],
    loading: false,
    error: false
};

const fetchAllRecipesStart = (state, action) => {
    return { ...state,
        loading: true
    }
};

const fetchAllRecipesSuccess = (state, action) => {
    return { ...state,
        recipes: [...action.recipes],
        loading: false,
        error: false
    }
};

const fetchAllRecipesFail = (state, action) => {
    return { ...state,
        loading: false,
        error: true
    }
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_RECIPES_START:
            return fetchAllRecipesStart(state, action);
        
        case actionTypes.FETCH_ALL_RECIPES_SUCCESS:
            return fetchAllRecipesSuccess(state, action);
        
        case actionTypes.FETCH_ALL_RECIPES_FAIL:
            return fetchAllRecipesFail(state, action);
        
        default:
            return state;
    }
};

export default recipesReducer;