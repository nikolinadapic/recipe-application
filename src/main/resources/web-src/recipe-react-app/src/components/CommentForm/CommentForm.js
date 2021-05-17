import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Spinner from '../UI/Spinner/Spinner';
import classes from './CommentForm.module.css';

const CommentForm = props => {
    const { author, text, validComment, touchedComment, loading, error } = useSelector(state => state.commentForm);

    const dispatch = useDispatch();

    const onSubmitComment = useCallback(
        (commentFormData, id) => dispatch(actions.submitComment(commentFormData, id)),
        [dispatch]
    );
    const onChangeCommentInput = useCallback(
        (value, inputIdentifier) => dispatch(actions.changeCommentInput(value, inputIdentifier)),
        [dispatch]
    );

    const submitHandler = () => {
        const formData = {
            author: author,
            text: text
        };
        onSubmitComment(formData, props.id);
    }

    let commentForm = <div>
        <Input label="Author"
            elementType="input"
            elementConfig={{ type: 'text', placeholder: 'Author Name' }}
            value={author}
            invalid={false}
            shouldValidate={{}}
            touched={false}
            errorMessage=""
            changed={(event) => onChangeCommentInput(event.target.value, 'author')} />
        <Input label="Comment Text"
            elementType="textarea"
            elementConfig={{ type: 'text', placeholder: '', rows: 4 }}
            value={text}
            invalid={!validComment}
            shouldValidate={{}}
            touched={touchedComment}
            errorMessage="Cannot submit an empty comment."
            changed={(event) => onChangeCommentInput(event.target.value, 'text')} />
        {error ? <p className={classes.ErrorMessage}>{error.message}</p> : null}
        {loading ? <Spinner /> : <Button type="submit" btnType="Submit" disabled={!validComment} clicked={submitHandler}>SUBMIT</Button>}
    </div>;

    return commentForm;
}

export default CommentForm;