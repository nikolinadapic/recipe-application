import * as actionTypes from '../actions/actionTypes';
import { checkIfUnique, checkAllIngredients, checkValidity } from '../utility';

const initialState = {
    ingredients: [{
        ingredientName: '',
        amount: '',
        unitOfMeasure: {
            unitOfMeasureName: 'Teaspoon'
        }
    }],
    validIngredients: [{
        validIngredientName: false,
        validAmount: false,
        touchedIngredientName: false,
        touchedAmount: false
    }],
    allIngredientsValid: true
}

const addIngredient = (state, action) => {
    return { ...state,
        ingredients: state.ingredients.concat({
            ingredientName: '',
            amount: '',
            unitOfMeasure: {
                unitOfMeasureName: ''
            }
        }),
        validIngredients: state.validIngredients.concat({
            validIngredientName: false,
            touchedIngredientName: false
        })
    };
};

const removeIngredient = (state, action) => {
    if (state.ingredients.length !== 1) {
        const ingredients = [...state.ingredients.slice(0, action.index), ...state.ingredients.slice(action.index + 1)];
        const validIngredients = [...state.validIngredients.slice(0, action.index), ...state.validIngredients.slice(action.index + 1)];
        return { ...state,
            ingredients: ingredients,
            validIngredients: validIngredients
        }
    }
    return state;
};

const changeIngredientInput = (state, action) => {
    let allIngredients = [...state.ingredients];
    let ingredientNames = [];
    let allValidIngredients = [];

    if (action.inputIdentifier === 'ingredientName') {
        allIngredients = [...state.ingredients.map((ingredient, index) => {
            if (index !== action.index) { return ingredient }
            return { ...ingredient, ingredientName: action.value }
        })];

        for (let i = 0; i < state.ingredients.length; i++) {
            if (i === action.index) { ingredientNames[i] = action.value; }
            else { ingredientNames.push(state.ingredients[i].ingredientName); }
        }
        
        const validName = checkIfUnique(ingredientNames);
        allValidIngredients = [...state.validIngredients.map((ingredient, index) => {
            if (index !== action.index) { return ingredient }
            return { ...ingredient,
                validIngredientName: validName,
                touchedIngredientName: true
            }
        })]
    }

    if (action.inputIdentifier === 'amount') {
        allIngredients = [...state.ingredients.map((ingredient, index) => {
            if (index !== action.index) { return ingredient }
            return { ...ingredient, amount: action.value }
        })];
        
        const validAmount = checkValidity(action.value, { isGreaterThanZero: true, required: false });
        allValidIngredients = [...state.validIngredients.map((ingredient, index) => {
            if (index !== action.index) { return ingredient }
            return { ...ingredient,
                validAmount: validAmount,
                touchedAmount: true
            }
        })]
    }

    if (action.inputIdentifier === 'unitOfMeasure') {
        allIngredients = [...state.ingredients.map((ingredient, index) => {
            if (index !== action.index) { return ingredient }
            return { ...ingredient, unitOfMeasure: { unitOfMeasureName: action.value } }
        })];
    }
        
    return { ...state,
        ingredients: allIngredients,
        validIngredients: (action.inputIdentifier === 'unitOfMeasure') ? state.validIngredients : allValidIngredients,
        allIngredientsValid: checkAllIngredients(allValidIngredients)
    };
};

const resetIngredients = (state, action) => {
    return { ...state,
        ingredients: [...initialState.ingredients],
        validIngredients: [...initialState.validIngredients],
        allIngredientsValid: initialState.allIngredientsValid
    };
};

const updateIngredientForm = (state, action) => {
    return { ...initialState,
        ingredients: action.currentData.ingredients.map(ingredient => {
            const updatedIngredient = {
                ingredientName: ingredient.ingredientName,
                amount: ingredient.amount,
                unitOfMeasure: { unitOfMeasureName: ingredient.unitOfMeasure.unitOfMeasureName }
            };
            return updatedIngredient;
        }),
        validIngredients: action.currentData.ingredients.map(ingredient => {
            return {
                validIngredientName: true,
                validAmount: true,
                touchedIngredientName: true,
                touchedAmount: true
            }
        }),
        allIngredientsValid: true
    };
};

const ingredientFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        
        case actionTypes.CHANGE_INGREDIENT_INPUT:
            return changeIngredientInput(state, action);
        
        case actionTypes.RESET_INGREDIENTS:
            return resetIngredients(state, action);
        
        case actionTypes.UPDATE_INGREDIENT_FORM:
            return updateIngredientForm(state, action);
            
        default:
            return state;
    }
};

export default ingredientFormReducer;