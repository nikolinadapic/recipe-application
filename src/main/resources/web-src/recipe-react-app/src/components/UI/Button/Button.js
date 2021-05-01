import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css'

const Button = (props) => (
    <button onClick={props.clicked}
        type={props.type}
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')} >
        {props.children}
    </button>
);

Button.propTypes = {
    clicked: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    btnType: PropTypes.string
};

export default Button;