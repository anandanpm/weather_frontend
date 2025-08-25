import type React from "react";
import { motion } from "framer-motion";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", text = "Loading..." }) => {
  return (
    <div className={`loading-spinner loading-spinner--${size}`}>
      <motion.div className="spinner-icon" />
      {text && <p className="spinner-message">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
