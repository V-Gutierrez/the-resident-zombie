import React from 'react';
import { render } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';
import SurvivorForm from '../../Components/SurvivorForm/SurvivorForm';

describe('SurvivorForm Component', () => {
    test('should render creation form', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <SurvivorForm />
            </GlobalActionsProvider>
        );

        expect(getByText('Create my survivor account')).toBeTruthy();
        expect(getByText('Your Last Location')).toBeTruthy();
    });
    test('should render a message about location', () => {
        const { getByText } = render(
            <GlobalActionsProvider>
                <SurvivorForm />
            </GlobalActionsProvider>
        );

        expect(
            getByText(
                '(Your location will automatically masked for your own safety)'
            )
        ).toBeTruthy();
    });
    test('should render submit button', () => {
        const { getByTestId } = render(
            <GlobalActionsProvider>
                <SurvivorForm />
            </GlobalActionsProvider>
        );

        expect(getByTestId('submit-btn')).toHaveTextContent("I'm a SURVIVOR");
    });
});
