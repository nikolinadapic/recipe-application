import React, { useCallback, useState } from 'react';
import Button from '../UI/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { IoTrashBinOutline } from 'react-icons/io5';
import * as actions from '../../store/actions/index';
import Spinner from '../UI/Spinner/Spinner';
import { Redirect } from 'react-router';

const DeleteRecipeButton = props => {
    const { loading, error } = useSelector(state => state.deleteRecipe);

    const [clickedDelete, setClickedDelete] = useState(false);

    const dispatch = useDispatch();

    const onDeleteRecipe = useCallback(
        (id) => dispatch(actions.deleteRecipe(id)),
        [dispatch]
    );

    const deleteRecipeHandler = () => {
        setClickedDelete(true);
        onDeleteRecipe(props.id);
    }

    let button = error ? <p>An error occurred, could not delete.</p> : (loading ? <Spinner />
        : <Button type="button" clicked={deleteRecipeHandler}><IoTrashBinOutline /> Delete</Button>);

    return (clickedDelete && !error && !loading) ? <Redirect to="/recipe" /> : button;
}

export default DeleteRecipeButton;