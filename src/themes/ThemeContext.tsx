import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Theme, ThemeType, darkTheme } from './theme';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always use dark theme instead of checking user preferences
  const [themeType, setThemeType] = useState<ThemeType>('dark');
  
  // Theme is always darkTheme
  const theme = darkTheme;
  
  // This function still exists but effectively does nothing
  const toggleTheme = () => {
    // Keep it as dark theme always
    setThemeType('dark');
  };
  
  // Effect to ensure system always uses dark theme
  useEffect(() => {
    // Set dark theme in localStorage
    localStorage.setItem('theme', 'dark');
    
    // Apply dark mode to the HTML element
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Remove any system preference listeners since we always want dark theme
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, themeType, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 