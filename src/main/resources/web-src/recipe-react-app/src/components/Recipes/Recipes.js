import React, { useEffect, useCallback } from 'react';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Recipes.module.css';
import RecipesSearch from '../RecipesSearch/RecipesSearch';

const Recipes = props => {
    const { recipes, loading, error } = useSelector(state => state.allRecipes);
    const { recipesBySearch, loadingBySearch, errorBySearch, search } = useSelector(state => state.recipesSearch);

    const dispatch = useDispatch();

    const onFetchAllRecipes = useCallback(
        () => dispatch(actions.fetchAllRecipes()),
        [dispatch]
    );
    const onExitSearch = useCallback(
        () => dispatch(actions.exitSearch()),
        [dispatch]
    );
    const onResetRecipeForm = useCallback(
        () => dispatch(actions.resetRecipeForm()),
        [dispatch]
    );

    useEffect(() => {
        onExitSearch();
        onResetRecipeForm();
        onFetchAllRecipes();
    }, [onExitSearch, onResetRecipeForm, onFetchAllRecipes]);

    let allRecipes = recipes.length === 0 ? <p className={classes.Message}>No recipes yet! Please, create a new recipe to show it here.</p>
        : recipes.map((recipe) => {
            return (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className={classes.Link}>
                    {recipe.recipeName}
                </Link>
                );
            });
    if (search) {
        allRecipes = recipesBySearch.length === 0 ? <p className={classes.Message}>No recipes match the search.</p>
        : recipesBySearch.map((recipe) => {
            return (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className={classes.Link}>
                    {recipe.recipeName}
                </Link>
                );
            });
    }

    return <table className={classes.Table}>
    <tbody>
        <tr>
            <td><RecipesSearch /></td>
        </tr>
        <tr>
            <td>
                {(error || errorBySearch) ? <p className={classes.ErrorMessage}>An error occurred.</p>
                    : ((loading || loadingBySearch) ? <Spinner /> : allRecipes)}
            </td>
        </tr>
    </tbody>
    </table>;
}

export default Recipes;