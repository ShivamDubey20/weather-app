"use client"

import { useWeather } from "./WeatherContext"
import type { WeatherData } from "./WeatherContext"
import { convertTemperature } from "@/lib/utils"
import { Droplets, Wind, Eye, Gauge, MapPin } from "lucide-react"
import styles from "./WeatherDisplay.module.css"

interface WeatherDisplayProps {
  weather: WeatherData
}

export default function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const { state } = useWeather()

  const temperature = convertTemperature(weather.temperature, state.temperatureUnit)
  const feelsLike = convertTemperature(weather.feelsLike, state.temperatureUnit)
  const unit = state.temperatureUnit === "celsius" ? "°C" : "°F"

  return (
    <div className={styles.weatherCard}>
      <div className={styles.header}>
        <div className={styles.location}>
          <MapPin size={20} />
          <h2>
            {weather.name}, {weather.country}
          </h2>
        </div>
        <div className={styles.mainTemp}>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className={styles.weatherIcon}
          />
          <span className={styles.temperature}>
            {Math.round(temperature)}
            {unit}
          </span>
        </div>
      </div>

      <div className={styles.description}>
        <p>{weather.description.charAt(0).toUpperCase() + weather.description.slice(1)}</p>
        <p className={styles.feelsLike}>
          Feels like {Math.round(feelsLike)}
          {unit}
        </p>
      </div>

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <Droplets className={styles.detailIcon} size={20} />
          <div>
            <span className={styles.detailLabel}>Humidity</span>
            <span className={styles.detailValue}>{weather.humidity}%</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <Wind className={styles.detailIcon} size={20} />
          <div>
            <span className={styles.detailLabel}>Wind Speed</span>
            <span className={styles.detailValue}>{weather.windSpeed} m/s</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <Eye className={styles.detailIcon} size={20} />
          <div>
            <span className={styles.detailLabel}>Visibility</span>
            <span className={styles.detailValue}>{(weather.visibility / 1000).toFixed(1)} km</span>
          </div>
        </div>

        <div className={styles.detailItem}>
          <Gauge className={styles.detailIcon} size={20} />
          <div>
            <span className={styles.detailLabel}>Pressure</span>
            <span className={styles.detailValue}>{weather.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}
