describe('Theme Switching', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle theme when clicking theme switch', () => {
    // Get the initial theme
    cy.get('body').then($body => {
      const initialTheme = $body.attr('data-theme');
      
      // Click theme toggle
      cy.get('.theme-toggle').click();
      
      // Check if theme changed
      cy.get('body').should('not.have.attr', 'data-theme', initialTheme);
    });
  });

  it('should persist theme preference on navigation', () => {
    // Click theme toggle to change theme
    cy.get('.theme-toggle').click();
    
    // Store current theme
    cy.get('body').invoke('attr', 'data-theme').as('currentTheme');
    
    // Navigate to another page
    cy.get('nav').contains('About').click();
    
    // Verify theme persisted
    cy.get('@currentTheme').then(theme => {
      cy.get('body').should('have.attr', 'data-theme', theme);
    });
  });
}); 