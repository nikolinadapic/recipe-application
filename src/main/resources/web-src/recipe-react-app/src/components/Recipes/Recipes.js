import React, { useEffect, useCallback } from 'react';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Recipes.module.css';

const Recipes = props => {
    const { recipes, loading, error } = useSelector(state => state.allRecipes);

    const dispatch = useDispatch();

    const onFetchAllRecipes = useCallback(
        () => dispatch(actions.fetchAllRecipes()),
        [dispatch]
    );

    useEffect(() => {
        onFetchAllRecipes();
    }, [onFetchAllRecipes]);

    let allRecipes = recipes.length === 0 ? <p className={classes.Message}>No recipes yet! Please, create a new recipe to show it here.</p>
        : recipes.map((recipe) => {
            return (
                <Link key={recipe.id} to={`/recipe/${recipe.id}`} className={classes.Link}>
                    {recipe.recipeName}
                </Link>
                );
            });

    return error ? <p className={classes.ErrorMessage}>An error occurred.</p>
        : (loading ? <Spinner /> : allRecipes);
}

export default Recipes;