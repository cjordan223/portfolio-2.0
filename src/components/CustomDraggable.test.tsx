import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '../test/test-utils';
import CustomDraggable from './CustomDraggable';

// Mock event listeners
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

beforeEach(() => {
  window.addEventListener = vi.fn();
  window.removeEventListener = vi.fn();
});

afterEach(() => {
  window.addEventListener = originalAddEventListener;
  window.removeEventListener = originalRemoveEventListener;
});

describe('CustomDraggable Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <CustomDraggable initialPosition={{ x: 0, y: 0 }}>
        <div>Test Content</div>
      </CustomDraggable>
    );
    expect(container.textContent).toContain('Test Content');
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <CustomDraggable initialPosition={{ x: 0, y: 0 }}>
        <div>Test Content</div>
      </CustomDraggable>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('renders correctly when disabled', () => {
    const { getByText } = render(
      <CustomDraggable disabled={true}>
        <div>Test Content</div>
      </CustomDraggable>
    );
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('allows custom handle class name', () => {
    const { container } = render(
      <CustomDraggable handleClassName="custom-handle">
        <div className="custom-handle">Handle</div>
        <div>Content</div>
      </CustomDraggable>
    );
    expect(container.querySelector('.custom-handle')).toBeInTheDocument();
  });
}); 