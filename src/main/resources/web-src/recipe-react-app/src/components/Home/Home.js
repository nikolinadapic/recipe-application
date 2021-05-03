import React from 'react';
import Spinner from '../UI/Spinner/Spinner';
import Slideshow from './Slideshow/Slideshow';

const Home = props => {
    return (
        <div>
            <Slideshow />
            <Spinner />
        </div>
    );
}

export default Home;