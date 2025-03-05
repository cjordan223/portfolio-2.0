import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DebugContextType {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
  logEvent: (category: string, message: string, data?: any) => void;
  clearLogs: () => void;
  logs: DebugLog[];
}

interface DebugLog {
  timestamp: Date;
  category: string;
  message: string;
  data?: any;
}

const DebugContext = createContext<DebugContextType | null>(null);

export const DebugProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isDebugMode, setIsDebugMode] = useState(false);
  const [logs, setLogs] = useState<DebugLog[]>([]);

  const toggleDebugMode = () => {
    setIsDebugMode(prev => !prev);
    console.log('Debug mode:', !isDebugMode);
  };

  const logEvent = (category: string, message: string, data?: any) => {
    const log = {
      timestamp: new Date(),
      category,
      message,
      data
    };
    
    if (isDebugMode) {
      console.log(`[${category}] ${message}`, data || '');
    }
    
    setLogs(prev => [log, ...prev].slice(0, 100)); // Keep last 100 logs
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode, logEvent, clearLogs, logs }}>
      {children}
      {isDebugMode && (
        <div className="debug-panel">
          <div className="debug-header">
            <h3>Debug Panel</h3>
            <button onClick={clearLogs}>Clear</button>
            <button onClick={toggleDebugMode}>Close</button>
          </div>
          <div className="debug-logs">
            {logs.map((log, i) => (
              <div key={i} className={`log-entry ${log.category}`}>
                <span className="timestamp">{log.timestamp.toLocaleTimeString()}</span>
                <span className="category">[{log.category}]</span>
                <span className="message">{log.message}</span>
                {log.data && <pre>{JSON.stringify(log.data, null, 2)}</pre>}
              </div>
            ))}
          </div>
        </div>
      )}
    </DebugContext.Provider>
  );
};

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
}; 