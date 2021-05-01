import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

const NavigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
                {props.children}
        </NavLink>
    </li>
);

NavigationItem.propTypes = {
    link: PropTypes.string,
    exact: PropTypes.bool
};

export default NavigationItem;