describe('flag survivor acceptance test', () => {
    it('should be possible to flag another survivor', () => {
        cy.visit('/dashboard');

        cy.get(':nth-child(1) > [data-cy=flag-survivor-btn]').click();

        cy.get('.Toastify__toast-body').contains(
            'That is some serious accusation, we hope you are wrong...'
        );
    });
});
