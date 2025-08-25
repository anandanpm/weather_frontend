import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  type?: 'error' | 'warning' | 'info';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onClose, 
  type = 'error' 
}) => {
  return (
    <div className={`error-message error-message--${type} animate-slide-down`}>
      <div className="error-content">
        <AlertTriangle className="error-icon" />
        <p className="error-text">{message}</p>
        {onClose && (
          <button 
            onClick={onClose} 
            className="error-close-btn"
            aria-label="Close error message"
          >
            <X className="close-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;