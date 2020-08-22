import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import App from '../../App';

describe('Header Component', () => {
    test('should render title correctly ', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <BrowserRouter>
                    <Switch>
                        <Header />
                    </Switch>
                </BrowserRouter>
            </GlobalActionsProvider>
        );

        expect(getByText('TRZ (The Resident Zombie)')).toBeTruthy();
    });
    test('should render links correctly ', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <BrowserRouter>
                    <Switch>
                        <Header />
                    </Switch>
                </BrowserRouter>
            </GlobalActionsProvider>
        );

        expect(getByText('DASHBOARD')).toBeTruthy();
        expect(getByText('GIVE UP AND BE CANCELLED')).toBeTruthy();
        expect(getByText('UPDATE MY LOCATION')).toBeTruthy();
    });
});
