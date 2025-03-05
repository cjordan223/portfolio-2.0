//working..

import React, { useState, useRef, useEffect } from 'react';

interface CustomDraggableProps {
  children: React.ReactNode;
  handleClassName?: string;
  initialPosition?: { x: number; y: number };
  disabled?: boolean;
}

const CustomDraggable: React.FC<CustomDraggableProps> = ({
  children,
  handleClassName = 'terminal-handle',
  initialPosition = { x: 20, y: 100 },
  disabled = false
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Don't implement dragging logic if disabled
  if (disabled) {
    return <>{children}</>;
  }

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const targetEl = e.target as HTMLElement;
      // Only initiate drag if clicking on the handle
      if (targetEl.classList.contains(handleClassName)) {
        e.preventDefault();
        setIsDragging(true);
        
        // Calculate offset from the click position to the container's top-left corner
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        // Update position based on mouse position and initial offset
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, handleClassName]);

  return (
    <div
      ref={containerRef}
      className={`custom-draggable ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {children}
    </div>
  );
};

export default CustomDraggable; 