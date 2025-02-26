// Custom commands for more readable tests
Cypress.Commands.add('typeInTerminal', (text: string) => {
  cy.get('.floating-cli input').type(text);
});

Cypress.Commands.add('executeCommand', (command: string) => {
  cy.get('.floating-cli input').type(`${command}{enter}`);
});

// No need to redeclare types here since we have index.d.ts
export {}; 