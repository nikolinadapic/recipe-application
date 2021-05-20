import React, { useState, useCallback } from 'react';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import classes from './RecipesSearch.module.css';
import Categories from '../RecipeForm/Categories/Categories';

const RecipesSearch = props => {
    const [showSelectSearch, setShowSelectSearch] = useState(true);
    const [showNameSearch, setShowNameSearch] = useState(false);
    const [showIngredientSearch, setShowIngredientSearch] = useState(false);
    const [showCategoriesSearch, setShowCategoriesSearch] = useState(false);

    const { name, ingredient } = useSelector(state => state.recipesSearch);
    const { selectedCategories } = useSelector(state => state.recipeForm);

    const dispatch = useDispatch();

    const onChangeNameSearchInput = useCallback(
        (value) => dispatch(actions.changeNameSearchInput(value)),
        [dispatch]
    );
    const onChangeIngredientSearchInput = useCallback(
        (value) => dispatch(actions.changeIngredientSearchInput(value)),
        [dispatch]
    );
    const onSubmitNameSearch = useCallback(
        (name) => dispatch(actions.submitNameSearch(name)),
        [dispatch]
    );
    const onSubmitIngredientSearch = useCallback(
        (ingredient) => dispatch(actions.submitIngredientSearch(ingredient)),
        [dispatch]
    );
    const onSubmitCategoriesSearch = useCallback(
        (categoriesParams) => dispatch(actions.submitCategoriesSearch(categoriesParams)),
        [dispatch]
    );
    const onExitSearch = useCallback(
        () => dispatch(actions.exitSearch()),
        [dispatch]
    );
    const onResetRecipeForm = useCallback(
        () => dispatch(actions.resetRecipeForm()),
        [dispatch]
    );

    const submitNameSearchHandler = () => {
        onSubmitNameSearch(name);
    }

    const submitIngredientSearchHandler = () => {
        onSubmitIngredientSearch(ingredient);
    }

    const submitCategoriesSearchHandler = () => {
        const queryParams = `?Desert=${selectedCategories.Desert}
            &Vegan=${selectedCategories.Vegan}
            &Meat=${selectedCategories.Meat}
            &Fish=${selectedCategories.Fish}
            &Mexican=${selectedCategories.Mexican}
            &Mediterranean=${selectedCategories.Mediterranean}
            &Grill=${selectedCategories.Grill}
            &Chinese=${selectedCategories.Chinese}
            &Raw=${selectedCategories.Raw}`;
        
        onSubmitCategoriesSearch(queryParams);
    }

    const showSelectSearchHandler = () => {
        if (showCategoriesSearch) { onResetRecipeForm(); }
        setShowSelectSearch(true);
        setShowNameSearch(false);
        setShowIngredientSearch(false);
        setShowCategoriesSearch(false);
        onExitSearch();
    }

    const showNameSearchHandler = () => {
        setShowSelectSearch(false);
        setShowNameSearch(true);
        setShowIngredientSearch(false);
        setShowCategoriesSearch(false);
    }

    const showIngredientSearchHandler = () => {
        setShowSelectSearch(false);
        setShowNameSearch(false);
        setShowIngredientSearch(true);
        setShowCategoriesSearch(false);
    }

    const showCategoriesSearchHandler = () => {
        setShowSelectSearch(false);
        setShowNameSearch(false);
        setShowIngredientSearch(false);
        setShowCategoriesSearch(true);
    }

    let nameSearch = <div className={classes.SearchBox}>
        <button className={classes.SearchButton} type="button" onClick={showSelectSearchHandler}><IoArrowBackOutline /></button>
        <input className={classes.SearchInput} type="text" placeholder="Recipe name" value={name} onChange={(event) => onChangeNameSearchInput(event.target.value)} />
        <button className={classes.SearchButton} type="submit" disabled={name===''} onClick={submitNameSearchHandler}><AiOutlineSearch /> Search</button>
    </div>;
    
    let ingredientSearch = <div className={classes.SearchBox}>
        <button className={classes.SearchButton} type="button" onClick={showSelectSearchHandler}><IoArrowBackOutline /></button>
        <input className={classes.SearchInput} type="text" placeholder="Ingredient name" value={ingredient} onChange={(event) => onChangeIngredientSearchInput(event.target.value)} />
        <button className={classes.SearchButton} type="submit" disabled={ingredient===''} onClick={submitIngredientSearchHandler}><AiOutlineSearch /> Search</button>
    </div>;

    let categoriesSearch = <div className={classes.SearchBox}>
        <button className={classes.CategoriesBackButton} type="button" onClick={showSelectSearchHandler}>Back <IoArrowBackOutline /></button>
        <Categories />
        <button className={classes.CategoriesSearchButton} type="submit" onClick={submitCategoriesSearchHandler}><AiOutlineSearch /> Search</button>
    </div>;

    let recipesSearch = showSelectSearch ?
        <div className={classes.SearchBox}>
            <p>Search recipes by:</p>
            <button className={classes.SearchButton} type="button" onClick={showNameSearchHandler}>Name</button>
            <button className={classes.SearchButton} type="button" onClick={showIngredientSearchHandler}>Ingredient</button>
            <button className={classes.SearchButton} type="button" onClick={showCategoriesSearchHandler}>Categories</button>
        </div>
        : null;
    
    if (showNameSearch) {
        recipesSearch = nameSearch;
    }
    if (showIngredientSearch) {
        recipesSearch = ingredientSearch;
    }
    if (showCategoriesSearch) {
        recipesSearch = categoriesSearch;
    }

    return recipesSearch;
}

export default RecipesSearch;