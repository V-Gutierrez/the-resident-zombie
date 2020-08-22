describe('Search survivors acceptance test', () => {
    it('should be possible to search survivors by name', () => {
        cy.visit('/dashboard');

        cy.get('[data-cy=search-survivor-input]').type('Fabio Akita'); //persistent user
        cy.get('[data-testid=search-button]').click();

        cy.get('[data-cy=survivor-card]').contains('Fabio Akita');
    });
});
