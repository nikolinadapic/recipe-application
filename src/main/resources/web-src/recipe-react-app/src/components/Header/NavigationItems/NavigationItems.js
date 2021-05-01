import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/recipe" exact>All Recipes</NavigationItem>
        <NavigationItem link="/recipe/new" exact>New Recipe</NavigationItem>
    </ul>
);

export default NavigationItems;