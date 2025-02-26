import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TerminalContextType {
  isTerminalMinimized: boolean;
  setTerminalMinimized: (minimized: boolean) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isTerminalMinimized, setTerminalMinimized] = useState(false);

  return (
    <TerminalContext.Provider value={{ isTerminalMinimized, setTerminalMinimized }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}; 