describe('Reports acceptance test', () => {
    it('should render reports in page footer ', () => {
        cy.visit('/');

        cy.wait(3000);

        cy.get('[data-testid=statistics-svg]').contains(
            'Average of infected people'
        );
        cy.get('[data-testid=statistics-svg2]').contains(
            'Average of non-infected (healthy) people'
        );
        cy.get('[data-testid=footer-wrapper] > :nth-child(3)').contains(
            'Average items quantity per healthy person'
        );
        cy.get('[data-testid=footer-wrapper] > :nth-child(4)').contains(
            'Average items quantity per person'
        );
        cy.get('[data-testid=footer-wrapper] > :nth-child(5)').contains(
            'Total points lost in items that belong to infected people'
        );
        cy.get('[data-testid=footer-wrapper] > :nth-child(6)').contains(
            'Average items quantity per person'
        );
    });
});
