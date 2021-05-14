import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select 
                    style={{cursor: 'pointer'}}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.value}
                            </option>
                        ))}
                </select>
                );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

Input.propTypes = {
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.shape({
        required: PropTypes.bool,
        isGreaterThanZero: PropTypes.bool
    }),
    touched: PropTypes.bool,
    errorMessage: PropTypes.string,
    elementType: PropTypes.string.isRequired,
    elementConfig: PropTypes.shape({
        type: PropTypes.string,
        placeholder: PropTypes.string
    }).isRequired,
    value: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    label: PropTypes.string
};

export default Input;