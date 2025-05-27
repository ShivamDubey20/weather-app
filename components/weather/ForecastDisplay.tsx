"use client"

import { useWeather } from "./WeatherContext"
import type { ForecastDay } from "./WeatherContext"
import { convertTemperature } from "@/lib/utils"
import styles from "./ForecastDisplay.module.css"

interface ForecastDisplayProps {
  forecast: ForecastDay[]
}

export default function ForecastDisplay({ forecast }: ForecastDisplayProps) {
  const { state } = useWeather()
  const unit = state.temperatureUnit === "celsius" ? "°C" : "°F"

  return (
    <div className={styles.forecastContainer}>
      <h3 className={styles.forecastTitle}>5-Day Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecast.map((day, index) => {
          const temp = convertTemperature(day.temperature.max, state.temperatureUnit)

          return (
            <div key={index} className={styles.forecastCard}>
              <div className={styles.forecastDate}>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className={styles.forecastIcon}
              />
              <div className={styles.forecastTemp}>
                {Math.round(temp)}
                {unit}
              </div>
              <div className={styles.forecastDescription}>{day.description}</div>
              <div className={styles.forecastDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Humidity</span>
                  <span className={styles.detailValue}>{day.humidity}%</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Wind Speed</span>
                  <span className={styles.detailValue}>{day.windSpeed} m/s</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Visibility</span>
                  <span className={styles.detailValue}>{day.visibility} km</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Pressure</span>
                  <span className={styles.detailValue}>{day.pressure} hPa</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
