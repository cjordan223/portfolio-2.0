// Custom commands
Cypress.Commands.add('typeInTerminal', (text) => {
  cy.get('.floating-cli input').type(text);
});

Cypress.Commands.add('executeCommand', (command) => {
  cy.get('.floating-cli input').type(`${command}{enter}`);
}); 