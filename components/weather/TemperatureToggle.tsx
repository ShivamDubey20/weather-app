"use client"

import { useWeather } from "./WeatherContext"
import styles from "./TemperatureToggle.module.css"

export default function TemperatureToggle() {
  const { state, dispatch } = useWeather()

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_TEMPERATURE_UNIT" })
  }

  return (
    <div className={styles.toggleContainer}>
      <span className={styles.toggleLabel}>Temperature Unit:</span>
      <button
        onClick={handleToggle}
        className={`${styles.toggleButton} ${
          state.temperatureUnit === "fahrenheit" ? styles.fahrenheit : styles.celsius
        }`}
      >
        <span className={styles.toggleOption}>°C</span>
        <span className={styles.toggleOption}>°F</span>
        <div className={styles.toggleSlider}></div>
      </button>
    </div>
  )
}
