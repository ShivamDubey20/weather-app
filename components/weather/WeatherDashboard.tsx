"use client"

import { useEffect } from "react"
import { useWeather } from "./WeatherContext"
import { fetchWeatherData, fetchForecastData } from "@/lib/weatherApi"
import SearchInput from "./SearchInput"
import WeatherDisplay from "./WeatherDisplay"
import ErrorDisplay from "./ErrorDisplay"
import ForecastDisplay from "./ForecastDisplay"
import TemperatureToggle from "./TemperatureToggle"
import styles from "./WeatherDashboard.module.css"
import ApiStatus from "./ApiStatus"

export default function WeatherDashboard() {
  const { state, dispatch } = useWeather()

  // Fetch weather data
  const fetchWeather = async (city: string) => {
    dispatch({ type: "SET_LOADING", payload: true })
    dispatch({ type: "SET_ERROR", payload: null })

    try {
      const [weatherData, forecastData] = await Promise.all([fetchWeatherData(city), fetchForecastData(city)])

      dispatch({ type: "SET_WEATHER", payload: weatherData })
      dispatch({ type: "SET_FORECAST", payload: forecastData })
      dispatch({ type: "SET_LAST_SEARCHED_CITY", payload: city })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to fetch weather data",
      })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  // Auto-fetch last searched city on mount
  useEffect(() => {
    if (state.lastSearchedCity && !state.currentWeather) {
      fetchWeather(state.lastSearchedCity)
    }
  }, [state.lastSearchedCity])

  // Polling mechanism - refresh every 30 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (state.currentWeather && state.isPolling) {
      interval = setInterval(() => {
        fetchWeather(state.lastSearchedCity)
      }, 30000) // 30 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [state.currentWeather, state.isPolling, state.lastSearchedCity])

  // Start polling when weather data is loaded
  useEffect(() => {
    if (state.currentWeather && !state.isPolling) {
      dispatch({ type: "SET_POLLING", payload: true })
    }
  }, [state.currentWeather])

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weather Dashboard</h1>
        <TemperatureToggle />
      </header>

      <ApiStatus />

      <main className={styles.main}>
        <SearchInput onSearch={fetchWeather} />

        {state.error && <ErrorDisplay error={state.error} />}

        {state.loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {state.currentWeather && !state.loading && (
          <>
            <WeatherDisplay weather={state.currentWeather} />
            {state.forecast.length > 0 && <ForecastDisplay forecast={state.forecast} />}
          </>
        )}

        {!state.currentWeather && !state.loading && !state.error && (
          <div className={styles.welcome}>
            <h2>Welcome to Weather Dashboard</h2>
            <p>Search for a city to get started!</p>
          </div>
        )}
      </main>

      {state.isPolling && (
        <div className={styles.pollingIndicator}>
          <span className={styles.pollingDot}></span>
          Auto-refreshing every 30 seconds
        </div>
      )}
    </div>
  )
}
