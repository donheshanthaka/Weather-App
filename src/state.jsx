import React, { createContext, useContext, useState } from "react"

const WeatherContext = createContext()

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({})

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
      {children}
    </WeatherContext.Provider>
  )
}

const useWeatherContext = () => useContext(WeatherContext)

export { WeatherProvider, useWeatherContext }
