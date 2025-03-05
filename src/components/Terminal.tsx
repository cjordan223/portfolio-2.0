import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typed from 'typed.js';
import { useTheme } from '../themes/ThemeContext';
import CustomDraggable from './CustomDraggable';
import './Terminal.css'; // This should work now that we have the CSS file
import { useTerminal } from '../contexts/TerminalContext';

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
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const { setTerminalMinimized } = useTerminal();

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
        addToHistory(`<strong>Available commands:</strong><br><br>${commandList}<br><br>Tip: Type / to quickly access the command menu.`);
        
        setTimeout(() => {
          if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
          }
        }, 100);
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
      description: 'Minimize terminal and show navigation bar',
      action: () => {
        addToHistory('Minimizing terminal... Classic navigation bar will appear. Type "open" anywhere to restore the terminal experience.');
        setTimeout(() => {
          setIsMinimized(true);
        }, 1500);
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

    // Process command - strip the leading slash if present
    const cleanCommand = cmd.trim().startsWith('/') ? cmd.trim().substring(1) : cmd.trim();
    const commandParts = cleanCommand.split(' ');
    const commandName = commandParts[0].toLowerCase();
    
    if (commandName in commands) {
      commands[commandName].action();
    } else if (commandName === '') {
      // Do nothing for empty command
    } else {
      addToHistory(`Command not found: ${commandName}. Type "help" or "/" for available commands.`);
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

  // Handle key events for command history and menu navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Slash menu navigation
    if (showSlashMenu) {
      console.log(`Key pressed: ${e.key}`);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCommandIndex(prev => {
          const newIndex = prev < Object.keys(commands).length - 1 ? prev + 1 : prev;
          console.log(`ArrowDown: ${prev} -> ${newIndex}`);
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCommandIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : 0;
          console.log(`ArrowUp: ${prev} -> ${newIndex}`);
          return newIndex;
        });
      } else if (e.key === 'Enter' && selectedCommandIndex >= 0) {
        e.preventDefault();
        const commandKeys = Object.keys(commands);
        console.log(`Enter pressed, selecting: ${commandKeys[selectedCommandIndex]}`);
        if (selectedCommandIndex < commandKeys.length) {
          selectCommand(commandKeys[selectedCommandIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowSlashMenu(false);
      }
      return; // Important: prevent further processing
    }
    
    // Original command history navigation (when slash menu is not shown)
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
      } else if (input === '/' && showSlashMenu) {
        // If we're at the slash menu trigger, move into the menu
        setSelectedCommandIndex(0);
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

  // Move the renderSlashMenu function to the top for clarity
  const renderSlashMenu = () => {
    // Only render if showSlashMenu is true
    if (!showSlashMenu) {
      return null;
    }
    
    console.log("Rendering slash menu - commands:", Object.keys(commands));
    
    return (
      <div 
        ref={slashMenuRef} 
        className="slash-command-menu"
        style={{
          position: 'absolute',
          top: '100%',
          left: '20px',
          width: 'calc(100% - 40px)',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 10000,
          borderRadius: '8px'
        }}
      >
        <div className="slash-command-header">Available Commands</div>
        {Object.keys(commands).map((key, index) => (
          <div 
            key={key}
            className={`slash-command-item ${index === selectedCommandIndex ? 'selected' : ''}`}
            onClick={() => selectCommand(key)}
            onMouseEnter={() => setSelectedCommandIndex(index)}
          >
            <div className="command-name">/{commands[key].name}</div>
            <div className="command-description">{commands[key].description}</div>
          </div>
        ))}
      </div>
    );
  };

  // Update the handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Show slash menu when exactly "/" is typed, regardless of which terminal it is
    if (value === '/') {
      console.log("Showing slash menu");
      setShowSlashMenu(true);
      setSelectedCommandIndex(0);
    } else {
      setShowSlashMenu(false);
    }
  };

  // Select a command from the slash menu
  const selectCommand = (commandName: string) => {
    // Execute the command immediately instead of adding it to the input
    processCommand(commandName);
    setInput('');
    setShowSlashMenu(false);
    inputRef.current?.focus();
  };

  // Scroll selected item into view when navigating with keyboard
  useEffect(() => {
    if (showSlashMenu && selectedCommandIndex >= 0 && slashMenuRef.current) {
      const menuElement = slashMenuRef.current;
      const selectedElement = menuElement.children[selectedCommandIndex + 1]; // +1 for header
      
      if (selectedElement) {
        // Get position of the selected element relative to the menu container
        const selectedRect = selectedElement.getBoundingClientRect();
        const menuRect = menuElement.getBoundingClientRect();
        
        // Check if selected item is outside the visible area
        const isAbove = selectedRect.top < menuRect.top;
        const isBelow = selectedRect.bottom > menuRect.bottom;
        
        if (isAbove) {
          // Scroll up to show the selected item
          menuElement.scrollTop += selectedRect.top - menuRect.top;
        } else if (isBelow) {
          // Scroll down to show the selected item
          menuElement.scrollTop += selectedRect.bottom - menuRect.bottom;
        }
      }
    }
  }, [selectedCommandIndex, showSlashMenu]);

  // Add explicit click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (slashMenuRef.current && !slashMenuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Add this effect to sync the states
  useEffect(() => {
    setTerminalMinimized(isMinimized);
  }, [isMinimized, setTerminalMinimized]);

  // Add debug output
  useEffect(() => {
    console.log(`Terminal initialized: isMainTerminal=${isMainTerminal}, slashMenuRef=${!!slashMenuRef.current}`);
  }, [isMainTerminal]);

  // Add this effect to ensure focus when terminal is shown
  useEffect(() => {
    // Focus the input when the terminal is displayed
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
      
      // Debugging focus issues
      console.log('Attempting to focus terminal input');
    }
  }, [isMinimized]);

  // Focus input on any click within the terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Make sure the / menu and focus work in all terminal instances
  useEffect(() => {
    // This ensures the input field is focused when the terminal is clicked
    const handleWindowFocus = () => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleWindowFocus);
    
    // Fix for the slash menu in draggable terminal
    const handleSlashKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement === inputRef.current) {
        setShowSlashMenu(true);
        setSelectedCommandIndex(0);
      }
    };
    
    document.addEventListener('keydown', handleSlashKey);
    
    return () => {
      document.removeEventListener('click', handleWindowFocus);
      document.removeEventListener('keydown', handleSlashKey);
    };
  }, []);

  // Keep the current selected index reference
  useEffect(() => {
    console.log("Selected command index:", selectedCommandIndex);
  }, [selectedCommandIndex]);

  // Ensure the input is always focused when clicking on the terminal
  useEffect(() => {
    const terminalContainer = document.querySelector(`.${terminalClass}`);
    if (terminalContainer) {
      terminalContainer.addEventListener('click', handleTerminalClick);
      return () => {
        terminalContainer.removeEventListener('click', handleTerminalClick);
      };
    }
  }, [terminalClass]);

  // Debug effect 1: Log terminal state
  useEffect(() => {
    console.log("Terminal render state:", {
      showSlashMenu,
      selectedCommandIndex,
      input,
      slashMenuExists: !!slashMenuRef.current
    });
    
    // Check if slash menu is actually in the DOM
    if (showSlashMenu) {
      setTimeout(() => {
        const menuElem = document.querySelector('.slash-command-menu');
        console.log("Slash menu element found:", !!menuElem);
        if (menuElem) {
          console.log("Menu visibility:", window.getComputedStyle(menuElem).visibility);
          console.log("Menu display:", window.getComputedStyle(menuElem).display);
        }
      }, 100);
    }
  }, [showSlashMenu, selectedCommandIndex, input]);
  
  // Debug effect 2: Log slash menu state
  useEffect(() => {
    console.log(`Slash menu state updated - show: ${showSlashMenu}, selected: ${selectedCommandIndex}`);
    
    // Log what's actually in the DOM
    setTimeout(() => {
      const slashMenuElement = document.querySelector('.slash-command-menu');
      console.log('Slash menu element in DOM:', slashMenuElement);
      
      if (slashMenuElement) {
        // Check styles
        const styles = window.getComputedStyle(slashMenuElement);
        console.log('Slash menu styles:', {
          display: styles.display,
          visibility: styles.visibility,
          zIndex: styles.zIndex,
          position: styles.position
        });
      }
    }, 50);
  }, [showSlashMenu, selectedCommandIndex]);

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

  // Create a consistent terminal content component 
  const terminalContent = (
    <div className={`floating-cli ${terminalClass}`} style={{
      position: 'static',
      transform: 'none',
      width: '100%',
      margin: 0,
      backgroundColor: 'transparent',
      background: 'none',
      borderRadius: 0,
      boxShadow: 'none',
      border: 'none',
      padding: '10px',
      color: 'white'
    }}>
      {!isHomePage && (
        <div className="terminal-handle" style={{ 
          cursor: 'move', 
          padding: '5px', 
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(5px)',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type / for options"
          autoFocus
          className="terminal-input"
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            outline: 'none',
            caretColor: '#00ff9d',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            width: 'calc(100% - 20px)',
            marginLeft: '8px',
            padding: '4px 0',
            position: 'relative'
          }}
        />
        {showSlashMenu && renderSlashMenu()}
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
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type / for options"
            autoFocus
            className="terminal-input"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              outline: 'none',
              caretColor: '#00ff9d',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              width: 'calc(100% - 20px)',
              marginLeft: '8px',
              padding: '4px 0',
              position: 'relative'
            }}
          />
          {showSlashMenu && renderSlashMenu()}
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
      <div 
        className={`terminal-container ${terminalClass}`} 
        onClick={handleTerminalClick}
        data-testid="terminal-container"
      >
        {terminalContent}
        {showSlashMenu && !isHomePage && renderSlashMenu()}
      </div>
    </CustomDraggable>
  );
};

export default Terminal; 