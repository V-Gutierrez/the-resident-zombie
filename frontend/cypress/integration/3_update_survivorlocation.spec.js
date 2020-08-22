describe('update survivor location acceptance test', () => {
    it('should be able to access update route', () => {
        cy.visit('/dashboard');

        cy.get('[data-cy=to-update-link]').click();
    });
    it('should render map and send button', () => {
        cy.visit('/update');

        cy.wait(5000);

        cy.get('.leaflet-container').dblclick();
        cy.get('[data-cy=send-new-lonlat-btn]').click();

        cy.get('.Toastify__toast-body').contains(
            'Your location is now updated'
        );
    });
});
