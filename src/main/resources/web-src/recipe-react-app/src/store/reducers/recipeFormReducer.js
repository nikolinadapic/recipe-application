import * as actionTypes from '../actions/actionTypes';
import { inputElement, checkValidity } from '../utility';

const initialState = {
    recipeForm: {
        recipeName: { ...inputElement,
            label: 'Recipe name*',
            elementConfig: { ...inputElement.elementConfig, placeholder: 'Recipe name' },
            errorMessage: 'Recipe name is required.'
        },
        preparationTime: { ...inputElement,
            label: 'Preparation time*',
            elementConfig: { ...inputElement.elementConfig, type: 'number', placeholder: 'Time in minutes' },
            validation: { ...inputElement.validation, isGreaterThanZero: true },
            errorMessage: 'Preparation time is required and must be at least 1 minute.'
        },
        cookingTime: { ...inputElement,
            label: 'Cooking time',
            elementConfig: { ...inputElement.elementConfig, type: 'number', placeholder: 'Time in minutes' },
            validation: { ...inputElement.validation, required: false, isNonNegative: true },
            valid: true,
            errorMessage: 'Cooking time cannot be negative.'
        },
        servings: { ...inputElement,
            label: 'Number of servings*',
            elementConfig: { ...inputElement.elementConfig, type: 'number', placeholder: 'Number of servings' },
            validation: { ...inputElement.validation, isGreaterThanZero: true },
            errorMessage: 'Number of servings is required and must be at least 1.'
        },
        sourceUrl: { ...inputElement,
            label: 'Source URL',
            elementConfig: { ...inputElement.elementConfig, placeholder: 'e.g. www.example.com' },
            validation: { ...inputElement.validation, required: false, isUrl: true },
            valid: true,
            errorMessage: 'Please, enter a valid URL.'
        },
        directions: { ...inputElement,
            label: 'Directions*',
            elementType: 'textarea',
            elementConfig: { ...inputElement.elementConfig, rows: '4' },
            errorMessage: 'Directions are required.'
        },
        difficulty: { ...inputElement,
            label: 'Difficulty*',
            elementType: 'select',
            elementConfig: { ...inputElement.elementConfig,
                options: [
                    { value: 'EASY' },
                    { value: 'MODERATE' },
                    { value: 'HARD' }                   
                ]
            },
            value: 'EASY',
            validation: {},
            valid: true
        },
        notes: { ...inputElement,
            label: 'Additional notes',
            elementType: 'textarea',
            elementConfig: { ...inputElement.elementConfig, rows: '4' },
            validation: {},
            valid: true
        }
    },
    categories: [],
    selectedCategories: {
        Desert: false,
        Vegan: false,
        Meat: false,
        Fish: false,
        Mexican: false,
        Mediterranean: false,
        Grill: false,
        Chinese: false,
        Nonbaked: false
    },
    allIsValid: false,
    error: null,
    loading: false,
    responseId: 0,
    isUpdate: false
};


const checkRecipeFormValidity = (recipeForm) => {
    let allIsValid = true;
    for (let inputIdentifier in recipeForm) {
        allIsValid = recipeForm[inputIdentifier].valid && allIsValid;
    }
    return allIsValid;
};

const selectCategory = (state, action) => {
    const newSelectedCategory = { categoryName: action.inputIdentifier };
    const categoryIsClicked = !state.selectedCategories[action.inputIdentifier]

    const updatedCategories = [];
    if (state.categories.length === 0) {
        updatedCategories.push(newSelectedCategory);
    } else {
        for (let i = 0; i < state.categories.length; i++) {
            const currentCategory = state.categories[i].categoryName;
            if (currentCategory !== action.inputIdentifier && state.selectedCategories[currentCategory]) {
                updatedCategories.push(state.categories[i]);
            }
        }
        if (categoryIsClicked) {
           updatedCategories.push(newSelectedCategory);
        }
    }

    return { ...state,
        categories: updatedCategories,
        selectedCategories: { ...state.selectedCategories, [action.inputIdentifier]: categoryIsClicked }
    };
};

const changeRecipeInput = (state, action) => {
    const updatedRecipeForm = { ...state.recipeForm };
    const updatedFormElement = { ...updatedRecipeForm[action.inputIdentifier] };

    updatedFormElement.value = action.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    
    updatedRecipeForm[action.inputIdentifier] = updatedFormElement;
    let allIsValid = checkRecipeFormValidity(updatedRecipeForm);

    return { ...state,
        recipeForm: updatedRecipeForm,
        allIsValid: allIsValid
    };
};

const submitRecipeStart = (state, action) => {
    return { ...state, loading: true };
};

const submitRecipeSuccess = (state, action) => {
    return { ...state,
        error: null,
        loading: false,
        recipeForm: { ...initialState.recipeForm },
        allIsValid: initialState.allIsValid,
        categories: initialState.categories,
        selectedCategories: initialState.selectedCategories,
        responseId: action.response.data
    };
};

const submitRecipeFail = (state, action) => {
    return { ...state, loading: false, error: action.error };
};

const resetRecipeForm = (state, action) => {
    return { ...state,
        error: null,
        loading: false,
        recipeForm: { ...initialState.recipeForm },
        allIsValid: initialState.allIsValid,
        categories: initialState.categories,
        selectedCategories: initialState.selectedCategories,
        responseId: initialState.responseId,
        isUpdate: initialState.isUpdate
    };
};

const updateRecipeForm = (state, action) => {
    let selectedCategories = {};
    action.currentData.categories.forEach(category => {
        selectedCategories = { ...selectedCategories, [category.categoryName]: true };
    });
    return { ...initialState,
        recipeForm: { ...initialState.recipeForm,
            recipeName: { ...initialState.recipeForm.recipeName,
                value: action.currentData.recipeName,
                valid: true,
                touched: true
            },
            preparationTime: { ...initialState.recipeForm.preparationTime,
                value: action.currentData.preparationTime,
                valid: true,
                touched: true
            },
            cookingTime: { ...initialState.recipeForm.cookingTime,
                value: action.currentData.cookingTime,
                valid: true,
                touched: true
            },
            servings: { ...initialState.recipeForm.servings,
                value: action.currentData.servings,
                valid: true,
                touched: true
            },
            sourceUrl: { ...initialState.recipeForm.sourceUrl,
                value: action.currentData.sourceUrl,
                valid: true,
                touched: true
            },
            directions: { ...initialState.recipeForm.directions,
                value: action.currentData.directions,
                valid: true,
                touched: true
            },
            difficulty: { ...initialState.recipeForm.difficulty,
                value: action.currentData.difficulty,
                valid: true,
                touched: true
            },
            notes: { ...initialState.recipeForm.notes,
                value: action.currentData.notes.notes,
                valid: true,
                touched: true
            }
        },
        categories: action.currentData.categories.map(category => {
            const updatedCategory = { categoryName: category.categoryName };
            return updatedCategory;
        }),
        selectedCategories: { ...initialState.selectedCategories, ...selectedCategories },
        allIsValid: true,
        isUpdate: true
    };
};

const submitRecipeUpdateStart = (state, action) => {
    return { ...state, loading: true };
};

const submitRecipeUpdateSuccess = (state, action) => {
    return { ...state,
        error: null,
        loading: false,
        recipeForm: { ...initialState.recipeForm },
        allIsValid: initialState.allIsValid,
        categories: initialState.categories,
        selectedCategories: initialState.selectedCategories,
        responseId: initialState.responseId,
        isUpdate: false
    };
};

const submitRecipeUpdateFail = (state, action) => {
    return { ...state, loading: false, error: action.error };
};

const recipeFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_RECIPE_INPUT:
            return changeRecipeInput(state, action);
        
        case actionTypes.SELECT_CATEGORY:
            return selectCategory(state, action);
        
        case actionTypes.SUBMIT_RECIPE_START:
            return submitRecipeStart(state, action);
        
        case actionTypes.SUBMIT_RECIPE_SUCCESS:
            return submitRecipeSuccess(state, action);
        
        case actionTypes.SUBMIT_RECIPE_FAIL:
            return submitRecipeFail(state, action);
        
        case actionTypes.RESET_RECIPE_FORM:
            return resetRecipeForm(state, action);
        
        case actionTypes.UPDATE_RECIPE_FORM:
            return updateRecipeForm(state, action);
        
        case actionTypes.SUBMIT_RECIPE_UPDATE_START:
            return submitRecipeUpdateStart(state, action);
        
        case actionTypes.SUBMIT_RECIPE_UPDATE_SUCCESS:
            return submitRecipeUpdateSuccess(state, action);
        
        case actionTypes.SUBMIT_RECIPE_UPDATE_FAIL:
            return submitRecipeUpdateFail(state, action);
        
        default:
            return state;
    }
};

export default recipeFormReducer;