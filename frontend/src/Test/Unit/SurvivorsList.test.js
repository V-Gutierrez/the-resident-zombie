import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SurvivorsList from '../../Components/SurvivorsList/SurvivorsList';
import { GlobalActionsProvider } from '../../Context/Provider';

describe('SurvivorsList Component', () => {
    test('should render search button correctly', () => {
        const { queryByTestId } = render(
            <GlobalActionsProvider>
                <SurvivorsList />
            </GlobalActionsProvider>
        );

        expect(queryByTestId('search-button')).toBeTruthy();
    });
    test('should render search input correctly', () => {
        const { queryByPlaceholderText } = render(
            <GlobalActionsProvider>
                <SurvivorsList />
            </GlobalActionsProvider>
        );

        expect(
            queryByPlaceholderText('Looking for a survivor? Type here')
        ).toBeTruthy();
    });
    test('search input should have updated value after typing', () => {
        const { queryByPlaceholderText } = render(
            <GlobalActionsProvider>
                <SurvivorsList />
            </GlobalActionsProvider>
        );

        const searchInput = queryByPlaceholderText(
            'Looking for a survivor? Type here'
        );

        fireEvent.change(searchInput, { target: { value: 'TEST' } });

        expect(searchInput.value).toBe('TEST');
    });

    test('search button does not calls search function on click with empty search', () => {
        const searchSurvivor = jest.fn();

        const { queryByTestId } = render(
            <GlobalActionsProvider>
                <SurvivorsList searchSurvivor={searchSurvivor} />
            </GlobalActionsProvider>
        );

        fireEvent.click(queryByTestId('search-button'), {
            target: { value: 'TEST' },
        });

        expect(searchSurvivor).not.toHaveBeenCalled();
    });
});
