// Import commands.ts using ES2015 syntax:
import './commands';

// Configure global behavior here
Cypress.on('uncaught:exception', (err) => {
  // Returning false here prevents Cypress from failing the test on uncaught exceptions
  // This is useful for applications that may have some non-critical errors
  console.error('Uncaught exception:', err.message);
  return false;
});

// Add custom command log output for better test debugging
Cypress.Commands.overwrite('log', (originalFn, message) => {
  return originalFn(`🔍 ${message}`);
}); 