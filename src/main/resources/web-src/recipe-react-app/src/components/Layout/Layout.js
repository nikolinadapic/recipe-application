import React from 'react';
import Header from '../Header/Header';

const Layout = props => {
    return (
        <React.Fragment>
            <Header title="Recipe Application" />
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;