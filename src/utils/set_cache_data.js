const setCacheData = (cityCode, weatherData) => {
  const cachedWeatherData = localStorage.getItem("weatherData")
  const data = cachedWeatherData ? { ...JSON.parse(cachedWeatherData) } : {}
  data[cityCode] = weatherData
  localStorage.setItem("weatherData", JSON.stringify(data))
}

export default setCacheData
