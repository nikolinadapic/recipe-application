import React, { useEffect, useRef, useState } from 'react';
import ingredients from '../../../pictures/ingredients.jpg';
import food from '../../../pictures/food.jpg';
import cakes from '../../../pictures/cakes.jpg';
import classes from './Slideshow.module.css';

const Slideshow = props => {
    const pictures = [ingredients, food, cakes];
    const delay = 2500;

    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(() =>
            setIndex((prevIndex) => prevIndex === pictures.length - 1 ? 0 : prevIndex + 1),
            delay);
        
        return () => {
            resetTimeout();
        };
    }, [index, pictures.length]);

    return (
        <div className={classes.Slideshow}>
            <div className={classes.SlideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {pictures.map((picture, i) => (
                    <div key={i}
                        className={classes.Slide}>
                            <img src={picture} alt="Food" />
                    </div>
                ))}
            </div>

            <div className={classes.SlideshowDots}>
                {pictures.map((_, i) => (
                    <div key={i}
                        className={[classes.SlideshowDot, index === i ? `${classes.SlideshowDotActive}` : ""].join(' ')}
                        onClick={() => setIndex(i)}>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slideshow;