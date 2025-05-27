"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import styles from "./ErrorDisplay.module.css"

interface ErrorDisplayProps {
  error: string
  onRetry?: () => void
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <AlertCircle className={styles.errorIcon} size={48} />
        <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
        <p className={styles.errorMessage}>{error}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            <RefreshCw size={16} />
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
