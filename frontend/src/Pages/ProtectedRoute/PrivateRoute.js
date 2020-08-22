import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { runClientAuthCheck } from './Services';

export default function PrivateRoute({ ...props }) {
    return runClientAuthCheck() ? <Route {...props} /> : <Redirect to="/" />;
}
