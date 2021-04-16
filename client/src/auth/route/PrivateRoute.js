import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../index';
import { ErrorBoundary }   from '../../core/ErrorBoundary';

//route for only authenticated users
const PrivateRoute = ({ component: Component, ...rest }) => (
    //props means components passed down to this private route component
    <Route {...rest} render={props => isAuthenticated() ? (
        <ErrorBoundary>
            <Component {...props} />
        </ErrorBoundary>
        
    ) : (
        <Redirect to={{
            pathname: "/signin",
            state: { from: props.location }
        }}
        />
    )} />
);

export default PrivateRoute;