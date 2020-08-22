import React from 'react';
import { render } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';
import AsideForm from '../../Components/SurvivorForm/AsideForm';

describe('AsideForm Component', () => {
    test('should render aside form label correctly', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <AsideForm />
            </GlobalActionsProvider>
        );

        expect(getByText('I already have an ID')).toBeTruthy();
    });
    test('should render aside form input correctly', () => {
        const { getByTestId } = render(
            <GlobalActionsProvider>
                <AsideForm />
            </GlobalActionsProvider>
        );

        expect(getByTestId('ID-input')).toBeTruthy();
    });
});
