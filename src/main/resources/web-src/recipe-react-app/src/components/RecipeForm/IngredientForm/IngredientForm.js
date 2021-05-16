import React from 'react';
import Input from '../../UI/Input/Input';
import classes from './IngredientForm.module.css';

const IngredientForm = props => {
    return (
        <div className={classes.IngredientForm}>
            <Input label="Ingredient name"
                elementType="input"
                elementConfig={{ type: 'text', placeholder: 'Ingredient name' }}
                value={props.data.ingredientName}
                invalid={!props.validAndTouched.validIngredientName}
                shouldValidate={{}}
                touched={props.validAndTouched.touchedIngredientName}
                errorMessage="Cannot have two ingredients with the same name."
                changed={(event) => props.changed(props.index, event.target.value, 'ingredientName')} />
            <Input label="Ingredient amount"
                elementType="input"
                elementConfig={{ type: 'number', placeholder: 'Amount' }}
                value={props.data.amount}
                invalid={!props.validAndTouched.validAmount}
                shouldValidate={{}}
                touched={props.validAndTouched.touchedAmount}
                errorMessage="Amount must be at least 1."
                changed={(event) => props.changed(props.index, event.target.value, 'amount')} />
            <Input label="Unit of measure"
                elementType="select"
                elementConfig={{
                    options: [
                        { value: 'Teaspoon' },
                        { value: 'Tablespoon' },
                        { value: 'Pinch' },
                        { value: 'Cup' },
                        { value: 'Each' },
                        { value: 'Packaging' },
                        { value: 'mL' },
                        { value: 'dL' },
                        { value: 'L' },
                        { value: 'g' },
                        { value: 'dag' },
                        { value: 'kg' }
                    ]
                }}
                value={props.data.unitOfMeasure.unitOfMeasureName}
                invalid={false}
                shouldValidate={{}}
                touched={false}
                errorMessage=""
                changed={(event) => props.changed(props.index, event.target.value, 'unitOfMeasure')} />
        </div>
    );
}

export default IngredientForm;