import React from 'react';
import { render } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';
import SurvivorCard from '../../Components/SurvivorCard/SurvivorCard';

describe('SurvivorCard Component', () => {
    test('should render correctly based on props', () => {
        const mockSurvivor = {
            location: [0, 0],
            name: 'Keanu Reeves',
            age: 32,
            gender: 'M',
            infected: false,
        };

        const { getByTestId } = render(
            <GlobalActionsProvider>
                <SurvivorCard {...mockSurvivor} />
            </GlobalActionsProvider>
        );

        expect(getByTestId('survivor-name')).toHaveTextContent(
            mockSurvivor.name
        );
        expect(getByTestId('survivor-age')).toHaveTextContent(mockSurvivor.age);
        expect(getByTestId('survivor-gender')).toHaveTextContent(
            mockSurvivor.gender
        );
    });
    test('should not render buttons for infected survivor', () => {
        const mockSurvivor = {
            location: [0, 0],
            name: 'Keanu Reeves',
            age: 32,
            gender: 'M',
            infected: true,
        };

        const { queryByRole } = render(
            <GlobalActionsProvider>
                <SurvivorCard {...mockSurvivor} />
            </GlobalActionsProvider>
        );

        expect(queryByRole('button')).toBe(null);
    });
    test('should render custom message in infected survivor', () => {
        const mockSurvivor = {
            location: [0, 0],
            name: 'Keanu Reeves',
            age: 32,
            gender: 'M',
            infected: true,
        };

        const { getByTestId } = render(
            <GlobalActionsProvider>
                <SurvivorCard {...mockSurvivor} />
            </GlobalActionsProvider>
        );

        expect(getByTestId('warning-message')).toBeTruthy();
        expect(getByTestId('infected-message')).toBeTruthy();
    });
});
