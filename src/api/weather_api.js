/**
 * Fetches weather data for a given city code from the OpenWeather API.
 * @param {number} cityCode - The city code to fetch weather data for.
 * @returns {Promise<object>} A Promise that resolves to an object representing the weather data for the given city code.
 */
const getWeatherDataAPI = async (cityCode) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${
      import.meta.env.VITE_APP_OPENWEATHER_API_KEY
    }`
  )
  const data = await response.json()
  return data
}

export default getWeatherDataAPI
