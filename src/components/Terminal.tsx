import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typed from 'typed.js';
import { useTheme } from '../themes/ThemeContext';
import CustomDraggable from './CustomDraggable';
import './Terminal.css'; // This should work now that we have the CSS file

interface TerminalProps {
  welcomeMessage?: string;
  isMainTerminal?: boolean;
}

// Define the available commands
type Command = {
  name: string;
  description: string;
  action: () => void;
};

const Terminal: React.FC<TerminalProps> = ({ 
  welcomeMessage = "Welcome to my Portfolio",
  isMainTerminal = false
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const isHomePage = location.pathname === '/';
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false); // Add this state for terminal visibility
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Add a class that we can use in testing
  const terminalClass = isMainTerminal ? "main-terminal" : "secondary-terminal";

  // Updated commands with your real information
  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Show all available commands',
      action: () => {
        const commandList = Object.values(commands)
          .map(cmd => `${cmd.name} - ${cmd.description}`)
          .join('<br>');
        addToHistory(`Available commands:<br>${commandList}`);
      }
    },
    about: {
      name: 'about',
      description: 'Learn about me',
      action: () => {
        navigate('/about');
      }
    },
    projects: {
      name: 'projects',
      description: 'View my projects',
      action: () => {
        navigate('/projects');
      }
    },
    resume: {
      name: 'resume',
      description: 'View my resume',
      action: () => {
        navigate('/resume');
      }
    },
    contact: {
      name: 'contact',
      description: 'Go to contact page',
      action: () => {
        navigate('/contact');
      }
    },
    phishfinder: {
      name: 'phishfinder',
      description: 'Learn about my capstone project',
      action: () => {
        addToHistory(`<strong>Phishfinder</strong> - Capstone Project (2024)<br>
        A lightweight Chrome extension using AI and algorithmic analysis for real-time phishing detection in Gmail.<br>
        <strong>Tech Stack:</strong> MongoDB, Express, Vue.js, Node.js<br>
        <strong>Highlight:</strong> Received Capstone Award for Innovation`);
      }
    },
    clear: {
      name: 'clear',
      description: 'Clear terminal',
      action: () => {
        setHistory([]);
      }
    },
    exit: {
      name: 'exit',
      description: 'Minimize or hide the terminal',
      action: () => {
        addToHistory('Minimizing terminal... (Type "open" anywhere to restore)');
        // Wait a moment for the message to be visible before minimizing
        setTimeout(() => {
          setIsMinimized(true);
        }, 1000);
      }
    },
    open: {
      name: 'open',
      description: 'Restore the terminal if minimized',
      action: () => {
        setIsMinimized(false);
      }
    }
  };

  // Initialize typed.js for welcome message
  useEffect(() => {
    if (welcomeRef.current) {
      const typed = new Typed(welcomeRef.current, {
        strings: [`Welcome to my Portfolio`],
        typeSpeed: 40,
        showCursor: false,
        autoInsertCss: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  // Function to process user input
  const processCommand = (cmd: string) => {
    // Add command to history
    addToHistory(`> ${cmd}`, 'command');
    
    // Add to command history for up/down keys
    setCommandHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Process command
    const commandParts = cmd.trim().split(' ');
    const commandName = commandParts[0].toLowerCase();
    
    if (commandName in commands) {
      commands[commandName].action();
    } else if (commandName === '') {
      // Do nothing for empty command
    } else {
      addToHistory(`Command not found: ${commandName}. Type "help" for available commands.`);
    }
  };

  // Add output to terminal history
  const addToHistory = (text: string, type: 'output' | 'command' = 'output') => {
    // Replace literal \n with <br> for HTML rendering
    const formattedText = text.replace(/\\n/g, '<br>');
    setHistory(prev => [...prev, `${type === 'command' ? '> ' : ''}${formattedText}`]);
    
    // Scroll to bottom
    setTimeout(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  };

  // Handle key events for command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Update the focus mechanism to be more aggressive
  useEffect(() => {
    // Focus on mount
    inputRef.current?.focus();
    
    // Re-focus when the window is clicked
    const handleWindowClick = () => {
      inputRef.current?.focus();
    };
    
    // Use capture phase to ensure we get the click first
    window.addEventListener('click', handleWindowClick, true);
    
    return () => {
      window.removeEventListener('click', handleWindowClick, true);
    };
  }, []);

  // If terminal is minimized, show only a small indicator
  if (isMinimized) {
    return (
      <div 
        className="terminal-minimized"
        onClick={() => setIsMinimized(false)}
        style={{ backgroundColor: theme.cardBackground }}
      >
        <span>Terminal (Click to restore)</span>
      </div>
    );
  }

  // Render the terminal content in a way that can be reused
  const terminalContent = (
    <div className={`floating-cli ${terminalClass}`} style={{
      position: 'static',
      transform: 'none',
      width: '100%',
      margin: 0,
      backgroundColor: isHomePage ? 'transparent' : theme.cardBackground,
      borderRadius: isHomePage ? 0 : '8px',
      boxShadow: isHomePage ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.5)',
      border: 'none',
      padding: isHomePage ? '10px' : '15px'
    }}>
      {!isHomePage && (
        <div className="terminal-handle" style={{ 
          cursor: 'move', 
          padding: '5px', 
          backgroundColor: theme.primary, 
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'white', padding: '0 8px' }}>
            drag to move (or type 'help')
          </span>
          <div 
            className="terminal-toggle"
            onClick={() => setIsMinimized(true)}
            style={{ 
              cursor: 'pointer',
              padding: '2px 10px',
              borderRadius: '4px'
            }}
          >
            —
          </div>
        </div>
      )}
      
      {isHomePage && welcomeMessage && (
        <div className="welcome-message">
          <span ref={welcomeRef}></span>
          <div className="help-hint">Type "help" to see available commands</div>
        </div>
      )}
      
      <div className="terminal-output" ref={outputRef}>
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            <span
              dangerouslySetInnerHTML={{ 
                __html: line.replace(/\n/g, '<br />') 
              }}
            />
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="terminal-line input-line">
        <span className="prompt">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.95)',
            outline: 'none',
            caretColor: '#00ff9d',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            width: 'calc(100% - 20px)',
            marginLeft: '8px'
          }}
        />
      </form>
    </div>
  );

  // On home page, just render floating text without any container
  if (isHomePage) {
    return (
      <div className={`home-terminal-text ${terminalClass}`} data-testid="terminal">
        {isHomePage && welcomeMessage && (
          <div className="welcome-message">
            <span ref={welcomeRef}></span>
            <div className="help-hint">Type "help" to see available commands</div>
          </div>
        )}
        
        <div className="terminal-output" ref={outputRef}>
          {history.map((line, index) => (
            <div key={index} className="terminal-line">
              <span
                dangerouslySetInnerHTML={{ 
                  __html: line.replace(/\n/g, '<br />') 
                }}
              />
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="terminal-line input-line">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.95)',
              outline: 'none',
              caretColor: '#00ff9d',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              width: 'calc(100% - 20px)',
              marginLeft: '8px'
            }}
          />
        </form>
      </div>
    );
  }
  
  // On other pages, use the draggable component
  return (
    <CustomDraggable 
      handleClassName="terminal-handle" 
      initialPosition={{ x: 20, y: 100 }}
      disabled={terminalClass === "main-terminal"}
    >
      {terminalContent}
    </CustomDraggable>
  );
};

export default Terminal; 