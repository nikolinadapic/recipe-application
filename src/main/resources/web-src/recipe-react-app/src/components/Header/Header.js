import React from 'react';
import PropTypes from 'prop-types';
import classes from './Header.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import { IoRestaurantOutline } from 'react-icons/io5';

const Header = (props) => {
    return (
        <header className={classes.Header}>
            <nav className={classes.Nav}>
                <p className={classes.Title}>{props.title}</p>
                <NavigationItems />
                <p className={classes.Icon}><IoRestaurantOutline /></p>
            </nav>
            
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string
};

export default Header;