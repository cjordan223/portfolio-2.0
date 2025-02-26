describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to my Portfolio').should('be.visible');
  });

  it('should have working terminal input', () => {
    cy.get('input').should('be.visible').type('test{enter}');
    cy.contains('Unknown command: test').should('be.visible');
  });

  it('should respond to terminal commands', () => {
    cy.get('input').type('help{enter}');
    cy.contains('Available commands').should('be.visible');
  });

  it('should have a footer with social links', () => {
    cy.contains('GitHub').should('be.visible');
    cy.contains('LinkedIn').should('be.visible');
  });
}); 