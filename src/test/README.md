# Testing Setup

This project uses two testing frameworks:

1. **Vitest** - For unit and component testing
2. **Cypress** - For end-to-end testing

## Vitest Setup

Vitest is integrated with the Vite build system and provides fast unit testing for React components. The setup includes:

- `vitest.config.ts` - Configuration file for Vitest
- `src/test/setup.ts` - Setup file for testing environment
- Jest-compatible API with React Testing Library integration

### Running Vitest Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Tests should be placed next to the component they're testing with a `.test.tsx` or `.spec.tsx` extension.

Example:
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';
import { AllTheProviders } from '../test/test-utils';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />, { wrapper: AllTheProviders });
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Cypress Setup

Cypress is used for end-to-end testing. The setup includes:

- `cypress.config.ts` - Configuration file for Cypress
- `cypress/e2e/` - Directory for end-to-end tests
- `cypress/support/` - Support files for Cypress

### Running Cypress Tests

```bash
# Open Cypress UI
npm run cypress:open

# Run all Cypress tests
npm run test:e2e

# Run a specific test
npm run test:basic
```

## Test Coverage

To generate test coverage reports:

```bash
npm run test:coverage
```

This will generate coverage reports in the `coverage` directory. 