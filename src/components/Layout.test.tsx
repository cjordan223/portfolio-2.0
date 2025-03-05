import { describe, it, expect, vi } from 'vitest';
import { render } from '../test/test-utils';
import Layout from './Layout';

// Mock child component
const MockChild = () => <div data-testid="mock-child">Child Component</div>;

// Mock the react-router-dom hooks and components
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useLocation: () => ({ pathname: '/' }),
    Link: ({ children, to }: { children: React.ReactNode, to: string }) => (
      <a href={to} data-testid="mock-link">{children}</a>
    ),
  };
});

describe('Layout Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Layout>
        <MockChild />
      </Layout>
    );
    expect(container.querySelector('.layout-container')).toBeInTheDocument();
  });

  it('renders the main content area', () => {
    const { container } = render(
      <Layout>
        <MockChild />
      </Layout>
    );
    expect(container.querySelector('.main-content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(
      <Layout>
        <MockChild />
      </Layout>
    );
    expect(getByTestId('mock-child')).toBeInTheDocument();
  });

  it('does not have duplicate main content areas', () => {
    const { container } = render(
      <Layout>
        <MockChild />
      </Layout>
    );
    const mainContentAreas = container.querySelectorAll('.main-content');
    expect(mainContentAreas.length).toBe(1);
  });
}); 