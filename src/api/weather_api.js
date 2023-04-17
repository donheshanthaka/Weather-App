/**
 * Fetches weather data for a given city code from the OpenWeather API.
 * @param {number} cityCode - The city code to fetch weather data for.
 * @returns {Promise<object>} A Promise that resolves to an object representing the weather data for the given city code.
 */
const getWeatherDataAPI = async (cityCode) => {
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
      console.error(`OpenWeather API error: ${error.message}`)
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()

    // Validate response data
    if (!data || !data.main || !data.weather) {
      console.error("Unexpected response data from OpenWeather API")
      throw new Error("Failed to parse weather data")
    }

    return data
  } catch (error) {
    console.error(`Error fetching weather data: ${error.message}`)
    throw error
  }
}

export default getWeatherDataAPI
