import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../themes/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { themeType, toggleTheme } = useTheme();
  const isDarkMode = themeType === 'dark';

  return (
    <div className={`theme-toggle ${className}`}>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleTheme}
        size={24}
        sunColor="#ee9b00"
        moonColor="#39ff14"
      />
    </div>
  );
};

export default ThemeToggle; 