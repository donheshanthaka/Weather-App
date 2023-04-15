/**
 * Fetches weather data for a given city code from the OpenWeather API.
 * @param {number} cityCode - The city code to fetch weather data for.
 * @returns {Promise<object>} A Promise that resolves to an object representing the weather data for the given city code.
 */
const getWeatherDataAPI = async (cityCode) => {
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

  const data = await response.json()
  return data
}

export default getWeatherDataAPI
