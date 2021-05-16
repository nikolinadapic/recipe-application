export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) { return true; }

    if (rules.required) { isValid = value.trim() !== '' && isValid; }

    if (rules.isGreaterThanZero) {
        const pattern = /^[1-9][0-9]*$/;
        isValid = (pattern.test(value) || value === '') && isValid;
    }

    if (rules.isNonNegative) {
        const pattern = /^[0-9]*$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}

export const checkIfUnique = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i !== j && array[i] !== '' && array[j] !== '') {
                if (array[i] === array[j]) {
                    return false;
                }
            }
        }
    }
    return true;
}

export const checkAllIngredients = (ingredients) => {
    let totalValidity = true;
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].touchedIngredientName) {
            totalValidity = ingredients[i].validIngredientName && totalValidity;
        }
        if (ingredients[i].touchedAmount) {
            totalValidity = ingredients[i].validAmount && totalValidity;
        }
    }
    return totalValidity;
}

export const inputElement = {
    label: '',
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: ''
    },
    value: '',
    validation: {
        required: true,
        isEmail: false,
        isGreaterThanZero: false,
        isNonNegative: false
    },
    valid: false,
    touched: false,
    errorMessage: ''
}