"use client"

import { WeatherProvider } from "@/components/weather/WeatherContext"
import WeatherDashboard from "@/components/weather/WeatherDashboard"

export default function Home() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  )
}
