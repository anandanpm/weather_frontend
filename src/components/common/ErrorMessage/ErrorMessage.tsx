import type React from "react";
import { AlertCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  type?: "error" | "warning" | "success" | "info";
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose, type = "error" }) => {
  return (
    <motion.div
      className={`error-message error-message--${type}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="error-message__content">
        <AlertCircle className="error-icon" />
        <p className="error-text">{message}</p>
      </div>

      {onClose && (
        <button
          className="error-close-btn"
          onClick={onClose}
          aria-label="Close error message"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
