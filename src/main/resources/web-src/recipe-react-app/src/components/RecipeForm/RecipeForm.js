import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './RecipeForm.module.css';
import Categories from './Categories/Categories';

const RecipeForm = props => {
    const { recipeForm, categories, allIsValid, loading, error } = useSelector(state => state.recipeForm);

    const [clickedSubmit, setClickedSubmit] = useState(false);

    const dispatch = useDispatch();
    
    const onChangeRecipeInput = useCallback(
        (value, inputIdentifier) => dispatch(actions.changeRecipeInput(value, inputIdentifier)),
        [dispatch]
    );
    const onSubmitRecipe = useCallback(
        (recipeFormData) => dispatch(actions.submitRecipe(recipeFormData)),
        [dispatch]
    );

    const formElementsArray = [];
    for (let key in recipeForm) {
        formElementsArray.push({
            id: key,
            config: recipeForm[key]
        });
    }

    const submitHandler = () => {
        setClickedSubmit(true);
        const formData = {
            recipeName: recipeForm.recipeName.value,
            preparationTime: recipeForm.preparationTime.value,
            cookingTime: recipeForm.cookingTime.value,
            servings: recipeForm.servings.value,
            sourceUrl: recipeForm.sourceUrl.value,
            directions: recipeForm.directions.value,
            difficulty: recipeForm.difficulty.value,
            notes: { notes: recipeForm.notes.value },
            categories: categories
        };
        onSubmitRecipe(formData);
        console.log(formData);
    }

    let form = (
        <form onSubmit={submitHandler}>
            {formElementsArray.map(formElement => (
                <Input key={formElement.id}
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    errorMessage={formElement.config.errorMessage}
                    changed={(event) => onChangeRecipeInput(event.target.value, formElement.id)} />
            ))}
            <h4 className={classes.CategoryTitle}>Categories</h4>
            <Categories />
            {clickedSubmit && !error && !loading ? <p className={classes.Success}>Recipe submitted successfully!</p> : null}
            {clickedSubmit && error && !loading ? <p className={classes.ErrorMessage}>{error.message}</p> : null}
            {loading ? <Spinner /> : <Button type="submit" btnType="Submit" disabled={!allIsValid}>SUBMIT</Button>}
        </form>
    );
    
    return <div>
        <h2>Create a new Recipe</h2>
        {form}

    </div>;
}

export default RecipeForm;