import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from './agent.js';

const PublicRoute = ({component: Component, ...rest}) => {
    let roleLoggedIn = isLoggedIn();
    let redirectPath = null;
    if (roleLoggedIn) {
        redirectPath = (roleLoggedIn === 'user') ? '/home' : '/dashboard';
    }
    return (
        <Route {...rest} render={props => (
            roleLoggedIn ? <Redirect to = {redirectPath} /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;