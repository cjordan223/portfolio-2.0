describe('Basic Test', () => {
  it('should be able to visit the home page', () => {
    cy.visit('/');
    cy.log('Successfully loaded the home page');
    cy.get('body').should('exist');
  });
}); 