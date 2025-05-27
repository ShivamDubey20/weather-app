// Get API configuration from environment variables
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5"

// Validate API key exists
if (!API_KEY) {
  throw new Error(
    "OpenWeatherMap API key is not configured. Please add NEXT_PUBLIC_OPENWEATHER_API_KEY to your .env.local file.",
  )
}

export async function fetchWeatherData(city: string) {
  const response = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please check the spelling and try again.")
    } else if (response.status === 401) {
      throw new Error("Invalid API key. Please check your configuration.")
    } else if (response.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.")
    } else {
      throw new Error("Failed to fetch weather data. Please try again later.")
    }
  }

  const data = await response.json()

  return {
    id: data.id,
    name: data.name,
    country: data.sys.country,
    temperature: data.main.temp,
    feelsLike: data.main.feels_like,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    visibility: data.visibility,
    pressure: data.main.pressure,
  }
}

export async function fetchForecastData(city: string) {
  const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found for forecast data.")
    } else if (response.status === 401) {
      throw new Error("Invalid API key for forecast data.")
    } else if (response.status === 429) {
      throw new Error("API rate limit exceeded for forecast. Please try again later.")
    } else {
      throw new Error("Failed to fetch forecast data. Please try again later.")
    }
  }

  const data = await response.json()

  // Group forecast data by day (take one forecast per day at noon)
  const dailyForecasts = data.list.filter((_: any, index: number) => index % 8 === 0).slice(0, 5)

  return dailyForecasts.map((forecast: any) => ({
    date: forecast.dt_txt.split(" ")[0],
    temperature: {
      min: forecast.main.temp_min,
      max: forecast.main.temp_max,
    },
    description: forecast.weather[0].description,
    icon: forecast.weather[0].icon,
    humidity: forecast.main.humidity,
    windSpeed: forecast.wind.speed,
    visibility: forecast.visibility / 1000, // Convert to kilometers
    pressure: forecast.main.pressure,
  }))
}

// Export API configuration for debugging
export const getApiConfig = () => ({
  hasApiKey: !!API_KEY,
  baseUrl: BASE_URL,
  // Don't expose the actual API key for security
  apiKeyPreview: API_KEY ? `${API_KEY.slice(0, 8)}...` : "Not configured",
})
