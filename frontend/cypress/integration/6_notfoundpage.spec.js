describe('Not Found page acceptance test', () => {
    it('should render 404 gag in an unknown route ', () => {
        cy.visit('/unkwnowroute');

        expect(cy.get('.notfound-container > h1')).to.exist;
    });
});
