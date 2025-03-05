import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../themes/ThemeContext';
import { TerminalProvider } from '../contexts/TerminalContext';
import { vi } from 'vitest';

// Mock localStorage
const setupLocalStorageMock = () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      clear: () => {
        store = {};
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      length: Object.keys(store).length,
      key: (index: number) => Object.keys(store)[index] || null,
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
};

// Mock matchMedia
const setupMatchMediaMock = () => {
  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
};

// Setup all mocks
export const setupMocks = () => {
  setupLocalStorageMock();
  setupMatchMediaMock();
};

// Wrapper component with all required providers
export const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <TerminalProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </TerminalProvider>
    </ThemeProvider>
  );
};

// Custom render function
export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  setupMocks();
  return render(ui, { wrapper: AllTheProviders, ...options });
};

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render }; 