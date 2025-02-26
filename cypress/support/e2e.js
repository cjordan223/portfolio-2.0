// Import commands
import './commands';

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err) => {
  console.error('Uncaught exception:', err.message);
  return false;
}); 