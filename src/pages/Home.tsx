import React from 'react';
import Terminal from '../components/Terminal';
import { useTheme } from '../themes/ThemeContext';
import './Home.css';

const Home: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="home-container" data-testid="home-container">
      {/* This is the only terminal that should appear on the home page */}
      <div className="floating-terminal" data-testid="home-terminal">
        <Terminal 
          welcomeMessage="Welcome to Conner Jordan's Portfolio" 
          isMainTerminal={true}
        />
      </div>
    </div>
  );
};

export default Home; 