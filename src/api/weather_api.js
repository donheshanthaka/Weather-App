const getWeatherDataAPI = async (cityCode) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_APP_OPENWEATHER_API_KEY}`)
  const data = await response.json()
  return data
}

export default getWeatherDataAPI