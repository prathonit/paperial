import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './agent.js';

const PrivateRoute = ({component: Component, ...rest}) => {
    let roleLoggedIn = isLoggedIn();
    return (
        <Route {...rest} render={props => (
            roleLoggedIn ? <Component {...props} /> : <Redirect to = '/' />
        )} />
    );
};

export default PrivateRoute;