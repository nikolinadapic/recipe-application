import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Categories.module.css';

const Categories = props => {
    const { selectedCategories } = useSelector(state => state.recipeForm);

    const dispatch = useDispatch();
    
    const onSelectCategory = useCallback(
        (inputIdentifier) => dispatch(actions.selectCategory(inputIdentifier)),
        [dispatch]
    );

    return (
        <table className={classes.AllCategories}>
        <tbody>
            <tr>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Desert" checked={selectedCategories.Desert} onChange={() => onSelectCategory("Desert")} />
                        Desert
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Vegan" checked={selectedCategories.Vegan} onChange={() => onSelectCategory("Vegan")} />
                        Vegan
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Meat" checked={selectedCategories.Meat} onChange={() => onSelectCategory("Meat")} />
                        Meat
                    </label>
                </td>
            </tr>
            <tr>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Fish" checked={selectedCategories.Fish} onChange={() => onSelectCategory("Fish")} />
                        Fish
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Mexican" checked={selectedCategories.Mexican} onChange={() => onSelectCategory("Mexican")} />
                        Mexican
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Mediterranean" checked={selectedCategories.Mediterranean} onChange={() => onSelectCategory("Mediterranean")} />
                        Mediterranean
                    </label>
                </td>
            </tr>
            <tr>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Grill" checked={selectedCategories.Grill} onChange={() => onSelectCategory("Grill")} />
                        Grill
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Chinese" checked={selectedCategories.Chinese} onChange={() => onSelectCategory("Chinese")} />
                        Chinese
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Nonbaked" checked={selectedCategories.Nonbaked} onChange={() => onSelectCategory("Nonbaked")} />
                        Nonbaked
                    </label>
                </td>
            </tr>
        </tbody>
        </table>
    );
}

export default Categories;