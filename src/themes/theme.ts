export type ThemeType = 'dark' | 'light';

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  accent: string;
  commandPrompt: string;
  commandText: string;
  success: string;
  error: string;
  warning: string;
  border: string;
  cardBackground: string;
}

export const darkTheme: Theme = {
  background: 'transparent',
  text: '#e6f0ff',
  primary: '#80b3ff',
  secondary: '#5e8ac7',
  accent: '#7ecaed',
  commandPrompt: '#a0c8ff',
  commandText: '#e6f0ff',
  success: '#7ee0d2',
  error: '#ff7e9d',
  warning: '#ffcc80',
  border: '#6b9bd3',
  cardBackground: 'rgba(26, 45, 80, 0.6)',
};

export const lightTheme: Theme = {
  background: 'transparent',
  text: '#1a365d',
  primary: '#3182ce',
  secondary: '#2c5282',
  accent: '#38b2ac',
  commandPrompt: '#4299e1',
  commandText: '#1a365d',
  success: '#38b2ac',
  error: '#e53e3e',
  warning: '#dd6b20',
  border: '#4299e1',
  cardBackground: 'rgba(235, 244, 255, 0.7)',
}; 