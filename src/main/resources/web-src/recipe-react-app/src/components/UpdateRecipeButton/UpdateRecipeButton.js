import React, { useCallback, useState } from 'react';
import Button from '../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router';

const UpdateRecipeButton = props => {
    const [clickedUpdate, setClickedUpdate] = useState(false);

    const dispatch = useDispatch();

    const onUpdateRecipeForm = useCallback(
        (id, currentData) => dispatch(actions.updateRecipeForm(id, currentData)),
        [dispatch]
    );
    const onUpdateIngredientForm = useCallback(
        (currentData) => dispatch(actions.updateIngredientForm(currentData)),
        [dispatch]
    );

    const updateHandler = () => {
        setClickedUpdate(true);
        onUpdateRecipeForm(props.id, props.currentData);
        onUpdateIngredientForm(props.currentData);
    }

    let button = <Button type="button" clicked={updateHandler}><AiOutlineEdit /> Edit</Button>;

    return clickedUpdate ? <Redirect to={'/recipe/' + props.id + '/update'} /> : button;
}

export default UpdateRecipeButton;