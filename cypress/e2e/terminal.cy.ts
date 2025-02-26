describe('Terminal Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    // Wait for terminal to be fully loaded
    cy.get('[data-testid="terminal"]', { timeout: 10000 }).should('be.visible');
  });

  it('should show welcome message', () => {
    // Updated selector to match our component
    cy.contains('Welcome to my Portfolio').should('be.visible');
  });

  it('should process help command', () => {
    cy.get('input').type('help{enter}');
    cy.contains('Available commands').should('be.visible');
  });

  it('should navigate to about page with command', () => {
    cy.get('.floating-cli input').type('about{enter}');
    cy.url().should('include', '/about');
  });

  it('should clear terminal with clear command', () => {
    cy.get('.floating-cli input').type('help{enter}');
    cy.get('.terminal-output').should('not.be.empty');
    cy.get('.floating-cli input').type('clear{enter}');
    cy.get('.terminal-output').children().should('have.length', 0);
  });

  it('should show error for unknown command', () => {
    cy.get('.floating-cli input').type('unknowncommand{enter}');
    cy.get('.terminal-output').should('contain', 'Command not found');
  });
}); 