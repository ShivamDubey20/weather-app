"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

// Types
export interface WeatherData {
  id: number
  name: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  description: string
  icon: string
  visibility: number
  pressure: number
}

export interface ForecastDay {
  date: string
  temperature: {
    min: number
    max: number
  }
  description: string
  icon: string
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
}

export interface WeatherState {
  currentWeather: WeatherData | null
  forecast: ForecastDay[]
  loading: boolean
  error: string | null
  lastSearchedCity: string
  temperatureUnit: "celsius" | "fahrenheit"
  isPolling: boolean
}

// Actions
type WeatherAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_WEATHER"; payload: WeatherData }
  | { type: "SET_FORECAST"; payload: ForecastDay[] }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LAST_SEARCHED_CITY"; payload: string }
  | { type: "TOGGLE_TEMPERATURE_UNIT" }
  | { type: "SET_POLLING"; payload: boolean }

// Initial state
const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  lastSearchedCity: "",
  temperatureUnit: "celsius",
  isPolling: false,
}

// Reducer
function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_WEATHER":
      return { ...state, currentWeather: action.payload, error: null }
    case "SET_FORECAST":
      return { ...state, forecast: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_LAST_SEARCHED_CITY":
      return { ...state, lastSearchedCity: action.payload }
    case "TOGGLE_TEMPERATURE_UNIT":
      return {
        ...state,
        temperatureUnit: state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius",
      }
    case "SET_POLLING":
      return { ...state, isPolling: action.payload }
    default:
      return state
  }
}

// Context
const WeatherContext = createContext<{
  state: WeatherState
  dispatch: React.Dispatch<WeatherAction>
} | null>(null)

// Provider
export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem("lastSearchedCity")
    const savedUnit = localStorage.getItem("temperatureUnit") as "celsius" | "fahrenheit"

    if (savedCity) {
      dispatch({ type: "SET_LAST_SEARCHED_CITY", payload: savedCity })
    }

    if (savedUnit) {
      dispatch({ type: "TOGGLE_TEMPERATURE_UNIT" })
    }
  }, [])

  // Save to localStorage when values change
  useEffect(() => {
    if (state.lastSearchedCity) {
      localStorage.setItem("lastSearchedCity", state.lastSearchedCity)
    }
  }, [state.lastSearchedCity])

  useEffect(() => {
    localStorage.setItem("temperatureUnit", state.temperatureUnit)
  }, [state.temperatureUnit])

  return <WeatherContext.Provider value={{ state, dispatch }}>{children}</WeatherContext.Provider>
}

// Hook
export function useWeather() {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}
