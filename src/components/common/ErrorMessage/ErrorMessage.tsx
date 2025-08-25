"use client"

import type React from "react"
import { AlertCircle, X } from "lucide-react"
import { motion } from "framer-motion"

interface ErrorMessageProps {
  message: string
  onClose?: () => void
  type?: "error" | "warning"
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose, type = "error" }) => {
  const typeClasses = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const iconClasses = {
    error: "text-red-500",
    warning: "text-yellow-500",
  }

  return (
    <motion.div
      className={`${typeClasses[type]} border rounded-lg p-4 flex items-center justify-between`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center space-x-3">
        <AlertCircle className={`w-5 h-5 ${iconClasses[type]}`} />
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close error message"
        >
          <X size={16} />
        </button>
      )}
    </motion.div>
  )
}

export default ErrorMessage
