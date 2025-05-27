"use client"

import { useEffect, useState } from "react"
import { getApiConfig } from "@/lib/weatherApi"
import { AlertTriangle, CheckCircle } from "lucide-react"
import styles from "./ApiStatus.module.css"

export default function ApiStatus() {
  const [config, setConfig] = useState<{
    hasApiKey: boolean
    baseUrl: string
    apiKeyPreview: string
  } | null>(null)

  useEffect(() => {
    setConfig(getApiConfig())
  }, [])

  if (!config) return null

  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusItem}>
        {config.hasApiKey ? (
          <CheckCircle className={styles.successIcon} size={16} />
        ) : (
          <AlertTriangle className={styles.errorIcon} size={16} />
        )}
        <span className={styles.statusText}>API Key: {config.hasApiKey ? "Configured" : "Missing"}</span>
      </div>

      {config.hasApiKey && (
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Key Preview:</span>
          <span className={styles.statusValue}>{config.apiKeyPreview}</span>
        </div>
      )}

      <div className={styles.statusItem}>
        <span className={styles.statusLabel}>Base URL:</span>
        <span className={styles.statusValue}>{config.baseUrl}</span>
      </div>
    </div>
  )
}
