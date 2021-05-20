import * as actionTypes from '../actions/actionTypes';

const initialState = {
    name: '',
    ingredient: '',
    recipesBySearch: [],
    loadingBySearch: false,
    errorBySearch: false,
    search: false
};

const changeNameSearchInput = (state, action) => {
    return { ...state,
        name: action.value
    };
};

const changeIngredientSearchInput = (state, action) => {
    return { ...state,
        ingredient: action.value
    };
};

const submitSearchStart = (state, action) => {
    return { ...state,
        loadingBySearch: true,
        search: true
    }
};

const submitSearchSuccess = (state, action) => {
    return { ...state,
        recipesBySearch: [...action.recipes],
        loadingBySearch: false,
        errorBySearch: false
    }
};

const submitSearchFail = (state, action) => {
    return { ...state,
        loadingBySearch: false,
        errorBySearch: true
    }
};

const exitSearch = (state, action) => {
    return { ...state,
        name: initialState.name,
        ingredient: initialState.ingredient,
        recipesBySearch: initialState.recipesBySearch,
        loadingBySearch: initialState.loadingBySearch,
        errorBySearch: initialState.errorBySearch,
        search: initialState.search
    }
};

const recipesSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_NAME_SEARCH_INPUT:
            return changeNameSearchInput(state, action);
        
        case actionTypes.CHANGE_INGREDIENT_SEARCH_INPUT:
            return changeIngredientSearchInput(state, action);
        
        case actionTypes.SUBMIT_SEARCH_START:
            return submitSearchStart(state, action);
        
        case actionTypes.SUBMIT_SEARCH_SUCCESS:
            return submitSearchSuccess(state, action);
        
        case actionTypes.SUBMIT_SEARCH_FAIL:
            return submitSearchFail(state, action);
        
        case actionTypes.EXIT_SEARCH:
            return exitSearch(state, action);
        
        default:
            return state;
    }
};

export default recipesSearchReducer;