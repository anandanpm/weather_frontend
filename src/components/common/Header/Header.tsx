import React from 'react';
import { Cloud } from 'lucide-react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="weather-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Cloud className="logo-icon animate-pulse" />
            <h1 className="logo-text animate-fade-in">Weather Dashboard</h1>
          </div>
          <p className="subtitle animate-slide-down">
            Get real-time weather information and browse weather history
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;