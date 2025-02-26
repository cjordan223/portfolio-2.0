/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to type in the terminal input
     * @example cy.typeInTerminal('help')
     */
    typeInTerminal(text: string): Chainable<Element>;

    /**
     * Custom command to execute a terminal command
     * @example cy.executeCommand('help')
     */
    executeCommand(command: string): Chainable<Element>;
  }
} 