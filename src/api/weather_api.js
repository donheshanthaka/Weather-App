import LogRocket from "logrocket"

/**

Retrieves weather data for a given city from the OpenWeather API.
@param {string} city - The name or ID of the city for which to retrieve weather data.
@param {string} [type="id"] - The type of query to perform. Valid values are "id" and "q".
@returns {Promise<object>} - A promise that resolves to an object containing weather data for the specified city.
@throws {Error} - Throws an error if the API call fails or the response data is unexpected.
*/
const getWeatherDataAPI = async (city, type = "id") => {
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
      `${OPENWEATHER_URL}?${type}=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
    )

    if (!response.ok) {
      const error = await response.json()
      if (enableLogging) {
        console.error(`OpenWeather API error: ${error.message}`)
      }

      if (error.cod === "404") {
        throw new Error("Invalid city. Please try again with a valid city.")
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
