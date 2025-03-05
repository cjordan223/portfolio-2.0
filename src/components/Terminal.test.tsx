import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../test/test-utils';
import Terminal from './Terminal';

// Mock the useNavigate hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useNavigate: () => vi.fn(),
  };
});

describe('Terminal Component', () => {
  it('renders without crashing', () => {
    render(<Terminal />);
    expect(screen.getByTestId('terminal')).toBeInTheDocument();
  });

  it('responds to user input', () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Check if the help command response is displayed
    expect(screen.getByText(/Available commands/i)).toBeInTheDocument();
  });

  it('shows slash menu when / is typed', () => {
    render(<Terminal />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '/' } });
    
    // Check if the slash menu appears
    expect(screen.getByText('Available Commands')).toBeInTheDocument();
    expect(screen.getByText('/help')).toBeInTheDocument();
  });
}); 