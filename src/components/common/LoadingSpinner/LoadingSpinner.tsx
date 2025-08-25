import React from 'react';
import { Loader } from 'lucide-react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'md',
  overlay = false 
}) => {
  const spinnerContent = (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <Loader className="spinner-icon animate-spin" />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loading-backdrop glass">
          {spinnerContent}
        </div>
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;