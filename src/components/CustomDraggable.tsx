import React, { useState, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CustomDraggableProps {
  children: React.ReactNode;
  handleClassName?: string;
  initialPosition?: { x: number; y: number };
  disabled?: boolean;
}

const CustomDraggable: React.FC<CustomDraggableProps> = ({ 
  children, 
  handleClassName,
  initialPosition = { x: 0, y: 0 },
  disabled = false
}) => {
  if (disabled) {
    return <>{children}</>;
  }

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>(initialPosition);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if the click is on the handle element
    if ((e.target as HTMLElement).closest(`.${handleClassName}`)) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault(); // Prevent text selection
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, e.clientX - offset.x),
        y: Math.max(0, e.clientY - offset.y)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 1000,
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  );
};

export default CustomDraggable; 