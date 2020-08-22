import React from 'react';
import { render } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';
import SurvivorUpdateForm from '../../Components/SurvivorUpdate/SurvivorUpdateForm';

describe('SurvivorUpdateForm Component', () => {
    test('should render initial structure', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <SurvivorUpdateForm />
            </GlobalActionsProvider>
        );

        expect(getByText('SEND NEW LOCATION')).toBeTruthy();
    });
    test('should render initial structure', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <SurvivorUpdateForm />
            </GlobalActionsProvider>
        );

        expect(getByText('Your Last Location')).toBeTruthy();
    });
});
