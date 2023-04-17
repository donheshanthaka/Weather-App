import LogRocket from "logrocket"

/**
 * Fetches weather data for a given city code from the OpenWeather API.
 * @param {number} cityCode - The city code to fetch weather data for.
 * @returns {Promise<object>} A Promise that resolves to an object representing the weather data for the given city code.
 */
const getWeatherDataAPI = async (cityCode) => {
  const enableLogging = process.env.NODE_ENV === "development"

  try {
    const OPENWEATHER_API_KEY =
      import.meta.env.VITE_APP_OPENWEATHER_API_KEY ??
      process.env.VITE_APP_OPENWEATHER_API_KEY

    const OPENWEATHER_URL =
      import.meta.env.VITE_APP_OPENWEATHER_URL ||
      process.env.VITE_APP_OPENWEATHER_URL ||
      "https://api.openweathermap.org/data/2.5/weather"

    const response = await fetch(
      `${OPENWEATHER_URL}?id=${cityCode}&units=metric&appid=${OPENWEATHER_API_KEY}`
    )

    if (!response.ok) {
      const error = await response.json()
      if (enableLogging) {
        console.error(`OpenWeather API error: ${error.message}`)
      }

      if (error.cod === "404") {
        throw new Error(
          "Invalid city code. Please try again with a valid city code."
        )
      } else {
        throw new Error("Failed to fetch weather data")
      }
    }

    const data = await response.json()

    // Validate response data
    if (!data || !data.main || !data.weather) {
      if (enableLogging) {
        console.error("Unexpected response data from OpenWeather API")
      }
      throw new Error("Failed to parse weather data")
    }

    return data
  } catch (error) {
    if (enableLogging) {
      console.error(`Error fetching weather data: ${error.message}`)
    }
    LogRocket.error(error)
    throw error
  }
}

export default getWeatherDataAPI
