

import type React from "react"
import { motion } from "framer-motion"
import "./LoadingSpinner.scss"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", text = "Loading..." }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      {text && <p className={`${textSizeClasses[size]} text-gray-600 text-center`}>{text}</p>}
    </div>
  )
}

export default LoadingSpinner
