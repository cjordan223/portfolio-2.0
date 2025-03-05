import React from 'react';
import './AuroraThemeSelector.css';

interface AuroraThemeSelectorProps {
  currentTheme: string;
  onChange: (theme: string) => void;
}

const AuroraThemeSelector: React.FC<AuroraThemeSelectorProps> = ({ 
  currentTheme, 
  onChange 
}) => {
  const themes = [
    { id: 'purple', name: 'Aurora Purple', color: '#9370DB' },
    { id: 'cyan', name: 'Northern Cyan', color: '#00CED1' },
    { id: 'green', name: 'Forest Green', color: '#32CD32' },
    { id: 'red', name: 'Crimson Glow', color: '#DC143C' }
  ];

  return (
    <div className="aurora-theme-selector">
      <div className="aurora-theme-title">Aurora Theme</div>
      <div className="aurora-theme-options">
        {themes.map(theme => (
          <button
            key={theme.id}
            className={`aurora-theme-button ${currentTheme === theme.id ? 'active' : ''}`}
            style={{ backgroundColor: theme.color }}
            onClick={() => onChange(theme.id)}
            title={theme.name}
          >
            {currentTheme === theme.id && <span className="check-mark">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AuroraThemeSelector; 