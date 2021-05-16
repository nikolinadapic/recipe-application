import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../store/actions/index';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './RecipeForm.module.css';
import Categories from './Categories/Categories';
import IngredientForm from './IngredientForm/IngredientForm';
import { IoCloseSharp } from 'react-icons/io5';

const RecipeForm = props => {
    const { recipeForm, categories, allIsValid, loading, error, responseId } = useSelector(state => state.recipeForm);
    const { ingredients, validIngredients, allIngredientsValid } = useSelector(state => state.ingredientForm);

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
    const onAddIngredient = useCallback(
        () => dispatch(actions.addIngredient()),
        [dispatch]
    );
    const onRemoveIngredient = useCallback(
        (index) => dispatch(actions.removeIngredient(index)),
        [dispatch]
    );
    const onChangeIngredientInput = useCallback(
        (index, value, inputIdentifier) => dispatch(actions.changeIngredientInput(index, value, inputIdentifier)),
        [dispatch]
    );

    const formElementsArray = [];
    for (let key in recipeForm) {
        formElementsArray.push({
            id: key,
            config: recipeForm[key]
        });
    }

    const submitHandler = (event) => {
        event.preventDefault(); 
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
            categories: categories,
            ingredients: ingredients.filter(ingredient => ingredient.ingredientName !== '' && ingredient.amount !== '')
        };
        onSubmitRecipe(formData);
    }

    let ingredientForm = ingredients.map(ingredient => {
        let index = ingredients.indexOf(ingredient);
        return (
            <table className={classes.IngredientForm} key={index}>
                <tbody>
                <tr>
                    <td>
                        <IngredientForm
                            changed={onChangeIngredientInput}
                            index={index}
                            data={ingredients[index]}
                            validAndTouched={validIngredients[index]} />
                    </td>
                    <td>
                        <button className={classes.RemoveIngredientButton}
                            type="button"
                            onClick={() => onRemoveIngredient(index)}>
                            <IoCloseSharp />
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        );
    });

    let form = (
        <form onSubmit={submitHandler}>
            <h4 className={classes.Title}>Ingredients</h4>
            {ingredientForm}
            <Button type="button" btnType="SimpleButton" clicked={onAddIngredient}>Add another ingredient</Button>
            <h4 className={classes.Title}>Recipe Details</h4>
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
            <h4 className={classes.Title}>Categories</h4>
            <Categories />
            {clickedSubmit && !error && !loading ? <p className={classes.Success}>Recipe submitted successfully!</p> : null}
            {clickedSubmit && error && !loading ? <p className={classes.ErrorMessage}>{error.message}</p> : null}
            {loading ? <Spinner /> : <Button type="submit" btnType="Submit" disabled={!(allIsValid && allIngredientsValid)}>SUBMIT</Button>}
        </form>
    );
    
    return <div>
        <h2>Create a new Recipe</h2>
        {clickedSubmit && !error && !loading ? <Redirect exact to={'/recipe/' + responseId + '/image'} /> : form}
    </div>;
}

export default RecipeForm;