import React, { createContext, useContext, useState } from "react"

const WeatherContext = createContext()

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState({})
  const [intervalIds, setIntervalIds] = useState([])

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, intervalIds, setIntervalIds }}>
      {children}
    </WeatherContext.Provider>
  )
}

const useWeatherContext = () => useContext(WeatherContext)

export { WeatherProvider, useWeatherContext }
