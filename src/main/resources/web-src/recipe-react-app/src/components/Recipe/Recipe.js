import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Recipe.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import { IoRestaurantOutline } from 'react-icons/io5';
import { HiOutlinePhotograph } from 'react-icons/hi';
import moment from 'moment';
import CommentForm from '../CommentForm/CommentForm';
import DeleteRecipeButton from '../DeleteRecipeButton/DeleteRecipeButton';
import Button from '../UI/Button/Button';
import { Redirect } from 'react-router';
import UpdateRecipeButton from '../UpdateRecipeButton/UpdateRecipeButton';

const Recipe = props => {
    const { recipe, loading, error } = useSelector(state => state.singleRecipe);

    const [showImage, setShowImage] = useState(false);
    const [imageName, setImageName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errorImage, setErrorImage] = useState(false);
    const [clickedAddImage, setClickedAddImage] = useState(false);

    const dispatch = useDispatch();

    const onFetchSingleRecipe = useCallback(
        (id) => dispatch(actions.fetchSingleRecipe(id)),
        [dispatch]
    );

    useEffect(() => {
        onFetchSingleRecipe(props.match.params.id);
    }, [onFetchSingleRecipe, props.match.params.id]);

    const downloadImage = () => {
        fetch('http://localhost:8080/recipe/' + props.match.params.id + '/recipeimage')
            .then(response => {
                if (response.headers.get('Content-Disposition') !== null) {
                    const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                    setImageName(filename);

                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        setImageUrl(url);

                        let a = document.createElement('a');
                        a.href = url;

                        setShowImage(true);
                    });
                } else {
                    setErrorImage(true);
                }
            });
    }

    const addImageHandler = () => {
        setClickedAddImage(true);
    }

    let singleRecipe = null;

    if (error) {
        singleRecipe = <p>An error occurred.</p>;
    }
    if (loading) {
        singleRecipe = <Spinner />;
    }
    if (recipe !== null && !error && !loading) {
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
                            <p className={classes.CommentAuthor}>{comment.author ? comment.author : 'Anonymous author'} ({time})</p>
                            <p className={classes.CommentText}>{comment.text}</p>
                        </div>
                    );
                })}
            </div>;
        
        singleRecipe = <div className={classes.Recipe}>
            <h2>{recipe.recipeName}</h2>
            <div className={classes.EditButtons}>
                <DeleteRecipeButton id={props.match.params.id} />
                <Button type="button" clicked={addImageHandler}><HiOutlinePhotograph /> Change Image</Button>
                <UpdateRecipeButton id={props.match.params.id} currentData={recipe} />
            </div>
            <table className={classes.Table}>
                <tbody>
                <tr>
                    <td className={classes.TableLabel}>Image:</td>
                    <td className={classes.TableContent}>{errorImage ? <p className={classes.NoImageText}>No image available.</p>
                        : (showImage ? <img className={classes.Image} src={imageUrl} alt={imageName} />
                            : <button className={classes.ImageButton} onClick={downloadImage}>Click to show image</button>)}</td>
                </tr>
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
                    <td className={classes.TableContent}>{recipe.cookingTime ? `${recipe.cookingTime} min` : ''}</td>
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
                    <td className={classes.TableContent}>
                        <a href={(recipe.sourceUrl.split('//')[0] === 'https:' || recipe.sourceUrl.split('//')[0] === 'http:')
                            ? `${recipe.sourceUrl}` : `//${recipe.sourceUrl}`} target="_blank" rel="noreferrer">
                            {recipe.sourceUrl}
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
            <h4 className={classes.CommentsTitle}>Comments</h4>
            {comments}
            <h4 className={classes.AddCommentTitle}>Add a comment</h4>
            <CommentForm id={props.match.params.id} />
        </div>;
    }

    return (clickedAddImage ? <Redirect to={'/recipe/' + props.match.params.id + '/image'} /> : singleRecipe);
};

export default Recipe;