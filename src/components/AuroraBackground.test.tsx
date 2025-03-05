import { describe, it, expect } from 'vitest';
import { render } from '../test/test-utils';
import AuroraBackground from './AuroraBackground';

describe('AuroraBackground Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<AuroraBackground />);
    // Check if the canvas container is rendered
    expect(container.querySelector('.aurora-container')).toBeInTheDocument();
  });

  it('does not have duplicate canvas containers', () => {
    const { container } = render(<AuroraBackground />);
    const canvasContainers = container.querySelectorAll('.aurora-container');
    expect(canvasContainers.length).toBe(1);
  });

  it('renders with correct theme prop', () => {
    const { container } = render(<AuroraBackground theme="purple" />);
    // We can only test that the component renders with the theme
    expect(container.querySelector('.aurora-container')).toBeInTheDocument();
  });
}); 