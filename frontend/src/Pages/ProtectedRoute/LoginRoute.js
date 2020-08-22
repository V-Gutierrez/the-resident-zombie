import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { runClientAuthCheck } from './Services';

export default function LoginRoute({ ...props }) {
    return runClientAuthCheck() ? (
        <Redirect to="/dashboard" />
    ) : (
        <Route {...props} />
    );
}
