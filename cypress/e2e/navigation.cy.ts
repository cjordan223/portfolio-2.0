describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to About page', () => {
    cy.get('nav').contains('About').click();
    cy.url().should('include', '/about');
    cy.get('h1').should('contain', 'About Me');
  });

  it('should navigate to Projects page', () => {
    cy.get('nav').contains('Projects').click();
    cy.url().should('include', '/projects');
    cy.get('h1').should('contain', 'My Projects');
  });

  it('should navigate to Resume page', () => {
    cy.get('nav').contains('Resume').click();
    cy.url().should('include', '/resume');
    cy.get('h1').should('contain', 'My Resume');
  });

  it('should navigate back to Home page', () => {
    cy.visit('/about');
    cy.contains('a', 'Home').click({ force: true });
    cy.url().should('include', '/');
  });
}); 