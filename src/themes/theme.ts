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
  text: '#e6e1d4',
  primary: '#8a7e63',
  secondary: '#5a4a3f',
  accent: '#7e8c65',
  commandPrompt: '#b39c7d',
  commandText: '#e6e1d4',
  success: '#7e8c65',
  error: '#a15c58',
  warning: '#c39669',
  border: '#8a7e63',
  cardBackground: 'rgba(74, 66, 57, 0.5)',
};

export const lightTheme: Theme = {
  background: 'transparent',
  text: '#3c3531',
  primary: '#5a4a3f',
  secondary: '#7e8c65',
  accent: '#c39669',
  commandPrompt: '#8a7e63',
  commandText: '#3c3531',
  success: '#7e8c65',
  error: '#a15c58',
  warning: '#c39669',
  border: '#5a4a3f',
  cardBackground: 'rgba(234, 227, 214, 0.7)',
}; 