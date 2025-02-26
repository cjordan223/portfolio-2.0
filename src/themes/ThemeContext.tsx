import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeType, darkTheme, lightTheme, Theme } from './theme';

interface ThemeContextType {
  themeType: ThemeType;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if user has a preference in localStorage or use system preference
  const getInitialTheme = (): ThemeType => {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      return savedTheme;
    }
    // Use system preference as fallback
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [themeType, setThemeType] = useState<ThemeType>(getInitialTheme);

  // Apply theme to body
  useEffect(() => {
    document.body.dataset.theme = themeType;
    localStorage.setItem('theme', themeType);
  }, [themeType]);

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setThemeType(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const theme = themeType === 'dark' ? darkTheme : lightTheme;

  const value = {
    themeType,
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 