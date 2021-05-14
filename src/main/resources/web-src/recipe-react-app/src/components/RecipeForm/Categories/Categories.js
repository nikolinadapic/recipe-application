import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Categories.module.css';

const Categories = props => {
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
                        <input type="checkbox" value="Desert" onChange={() => onSelectCategory("Desert")} />
                        Desert
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Vegan" onChange={() => onSelectCategory("Vegan")} />
                        Vegan
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Meat" onChange={() => onSelectCategory("Meat")} />
                        Meat
                    </label>
                </td>
            </tr>
            <tr>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Fish" onChange={() => onSelectCategory("Fish")} />
                        Fish
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Mexican" onChange={() => onSelectCategory("Mexican")} />
                        Mexican
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Mediterranean" onChange={() => onSelectCategory("Mediterranean")} />
                        Mediterranean
                    </label>
                </td>
            </tr>
            <tr>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Grill" onChange={() => onSelectCategory("Grill")} />
                        Grill
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Chinese" onChange={() => onSelectCategory("Chinese")} />
                        Chinese
                    </label>
                </td>
                <td className={classes.Cell}>
                    <label className={classes.Category}>
                        <input type="checkbox" value="Nonbaked" onChange={() => onSelectCategory("Nonbaked")} />
                        Nonbaked
                    </label>
                </td>
            </tr>
        </tbody>
        </table>
    );
}

export default Categories;