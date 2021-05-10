import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Recipe.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import { IoRestaurantOutline } from 'react-icons/io5';
import moment from 'moment';

const Recipe = props => {
    const { recipe, loading, error } = useSelector(state => state.singleRecipe);

    const dispatch = useDispatch();

    const onFetchSingleRecipe = useCallback(
        (id) => dispatch(actions.fetchSingleRecipe(id)),
        [dispatch]
    );

    useEffect(() => {
        onFetchSingleRecipe(props.match.params.id);
    }, [onFetchSingleRecipe, props.match.params.id]);

    let singleRecipe = null;

    if (error) {
        singleRecipe = <p>An error occurred.</p>;
    }
    if (loading) {
        singleRecipe = <Spinner />;
    }
    if (recipe !== null && !error && !loading) {
        console.log(recipe.categories);
        let categories = [];
        for (let i = 0; i < recipe.categories.length; i++) {
            categories.push(
                <div key={recipe.categories[i].id} className={classes.Categories}>
                    <p>{recipe.categories[i].categoryName}</p>
                </div>
           );
        }

        let ingredients =
            <div>
                <ul>
                    {recipe.ingredients.map(ingredient => {
                        return <li key={ingredient.id}>{ingredient.amount} {ingredient.unitOfMeasure.unitOfMeasureName} {ingredient.ingredientName}</li>
                    })}
                </ul>
            </div>;

        let comments =
        <div>
            {recipe.comments.map(comment => {
                const time = moment(comment.time).format("DD MMMM YYYY, [at] hh:mm:ss a");
                return (
                    <div key={comment.id} className={classes.CommentBox}>
                        <p className={classes.CommentAuthor}>{comment.author} ({time})</p>
                        <p className={classes.CommentText}>{comment.text}</p>
                    </div>
                );
            })}
        </div>;

        singleRecipe = <div className={classes.Recipe}>
            <h3>{recipe.recipeName}</h3>
            <table className={classes.Table}>
                <tbody>
                <tr>
                    <td className={classes.TableLabel}>Categories:</td>
                    <td className={classes.TableContent}>{categories}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Servings:</td>
                    <td className={classes.TableContent}><IoRestaurantOutline /> {recipe.servings}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Difficulty:</td>
                    <td className={classes.TableContent}>{recipe.difficulty}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Preparation time:</td>
                    <td className={classes.TableContent}>{recipe.preparationTime} min</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Cooking time:</td>
                    <td className={classes.TableContent}>{recipe.cookingTime} min</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Ingredients:</td>
                    <td className={classes.TableContent}>{ingredients}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Directions:</td>
                    <td className={classes.TableContent}>{recipe.directions}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Additional notes:</td>
                    <td className={classes.TableContent}>{recipe.notes.notes}</td>
                </tr>
                <tr>
                    <td className={classes.TableLabel}>Source:</td>
                    <td className={classes.TableContent}>{recipe.sourceUrl}</td>
                </tr>
                </tbody>
            </table>
            <h4 className={classes.CommentsTitle}>Comments</h4>
            {comments}
        </div>;
    }

    return (singleRecipe);
};

export default Recipe;