import React from 'react';
import { render } from '@testing-library/react';
import { GlobalActionsProvider } from '../../Context/Provider';

import Footer from '../../Components/Footer/Footer';

describe('Footer Component', () => {
    test('should render basic structure correctly', () => {
        const { getByTestId } = render(
            <GlobalActionsProvider>
                <Footer />
            </GlobalActionsProvider>
        );

        expect(getByTestId('statistics-svg')).toBeTruthy();
        expect(getByTestId('statistics-svg2')).toBeTruthy();
    });
    test('should render basic structure correctly', () => {
        const { getByTestId } = render(
            <GlobalActionsProvider>
                <Footer />
            </GlobalActionsProvider>
        );

        expect(getByTestId('footer-wrapper')).toBeTruthy();
    });
});
