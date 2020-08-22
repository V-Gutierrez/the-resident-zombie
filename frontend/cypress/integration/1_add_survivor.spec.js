describe('Add survivors to the database acceptance test', () => {
    it('should render the title in the header', () => {
        cy.visit('/');

        cy.get('.app-header').contains('TRZ (The Resident Zombie)');
    });

    it('should render form of survivor creation', () => {
        cy.get('.app-container > :nth-child(1)').contains(
            'Create my survivor account'
        );
    });
    it('Header links should not lead user to anywhere while survivor is inexistent', () => {
        cy.get('[data-cy=signout-link]').click();
        cy.get('[data-cy=to-dashboard-link]');
        cy.get('[data-cy=to-update-link]');
    });
    it('should be able to create a new of survivor and be redirected to dashboard', () => {
        cy.get('[data-cy=input-name').type(
            `Suvivor${parseInt(Math.random() * 1000)}`
        );
        cy.get('[data-cy=input-age').type(22);
        cy.get('[data-cy=input-gender-male').click();
        cy.get('.map-frame').dblclick();
        cy.get('#fijiWater').type(22);
        cy.get('#campbellSoup').type(22);
        cy.get('#firstAid').type(22);
        cy.get('#ak47').type(22);

        cy.get('[data-cy=submit-newsurvivor-button').click();
        cy.get('.Toastify__toast-body').contains(
            'Well done, you will be redirected to dashboard'
        );

        expect(cy.get('[data-testid=search-button]')).to.exist;
        expect(cy.get('[data-cy=search-survivor-input]')).to.exist;
    });
});
