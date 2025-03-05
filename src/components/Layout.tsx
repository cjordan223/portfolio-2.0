import React, { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Terminal from './Terminal';
import AuroraBackground from './AuroraBackground';
import { useTheme } from '../themes/ThemeContext';
import { useTerminal } from '../contexts/TerminalContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { isTerminalMinimized } = useTerminal();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '';
  
  // Log this for debugging
  useEffect(() => {
    console.log(`Current path: ${location.pathname}, isHomePage: ${isHomePage}`);
  }, [location.pathname, isHomePage]);

  // Debug AuroraBackground mounting
  useEffect(() => {
    console.log('AuroraBackground should be mounting');
  }, []);

  return (
    <div className="open-layout" style={{ color: theme.text, position: 'relative', minHeight: '100vh' }}>
      {/* Force Aurora Background to be full screen and below content */}
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }}>
        <AuroraBackground theme="cyan" />
      </div>
      
      {/* Show navigation only if terminal is minimized and on non-home pages */}
      {(isTerminalMinimized && !isHomePage) && (
        <nav className="minimal-nav">
          <Link to="/about" className="nav-link" style={{ color: theme.text }}>About</Link>
          <Link to="/projects" className="nav-link" style={{ color: theme.text }}>Projects</Link>
          <Link to="/resume" className="nav-link" style={{ color: theme.text }}>Resume</Link>
          <Link to="/contact" className="nav-link" style={{ color: theme.text }}>Contact</Link>
          <ThemeToggle />
        </nav>
      )}

      <main className="open-container">
        {children}
      </main>

      {/* Persistent Terminal - ONLY on non-home pages */}
      {!isHomePage && (
        <div className="persistent-terminal" data-testid="persistent-terminal">
          <Terminal welcomeMessage="" isMainTerminal={false} />
        </div>
      )}

      {/* Minimal footer - ONLY on non-home pages */}
      {!isHomePage && (
        <div className="minimal-footer">
          <p>&copy; {new Date().getFullYear()} Conner Jordan</p>
          <div className="social-links">
            <a href="https://github.com/cjordan223" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/conner-jordan-4b268514a" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout; 