import React, { useState, useEffect } from "react"
import cities from "../../data/cities.json"
import getWeatherDataAPI from "../../api/weather_api"
import WeatherComponent from "../components/WeatherComponent"
import { Box, useMediaQuery, Grid } from "@mui/material"
import randomHueValue from "../../utils/random_hue"
import backgroundImage from "../../assets/header_bg.png"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"

export default function HomePage() {
  const [weatherData, setWeatherData] = useState([])
  const [colors, setColors] = useState([])
  const isGridToggle = useMediaQuery("(min-width:1536px)")
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const isTabletScreen = useMediaQuery("(max-width:1750px)")

  const cityCodes = cities.List.map((city) => {
    return city.CityCode
  })

  const getWeatherData = async (cityCode) => {
    const cachedData = localStorage.getItem(cityCode)
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData)
      // Check if the cached data is less than 5 minutes old
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return data
      }
    }

    const weatherData = await getWeatherDataAPI(cityCode)
    // Cache the data with the current timestamp
    localStorage.setItem(
      cityCode,
      JSON.stringify({ data: weatherData, timestamp: Date.now() })
    )
    return weatherData
  }

  const handleClose = (index) => {
    console.log("close")
    const newData = [...weatherData]
    newData.splice(index, 1)
    setWeatherData(newData)
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = []
      for (const code of cityCodes) {
        const weather = await getWeatherData(code)
        data.push(weather)
      }
      setWeatherData(data)

      const tempColors = []
      for (let i = 0; i < data.length; i++) {
        tempColors.push(randomHueValue())
      }
      setColors(tempColors)
    }
    fetchWeatherData()
  }, [])

  return (
    <Box
      width="100%"
      flexDirection="column"
      backgroundColor="#1f2128"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <Box height="100%">
        <Box
          width="100%"
          minHeight="90vh"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Header />

          <SearchBar />

          <Box
            width={isMobileScreen ? "94%" : isTabletScreen ? "78%" : "64%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            marginBottom="5.2rem"
          >
            <Grid container>
              {weatherData.map((data, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  xl={6}
                  justifySelf="center"
                  width="100%"
                >
                  <Box
                    width={
                      isGridToggle ? "85%" : isThousandPixelWide ? "85%" : "65%"
                    }
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="2rem"
                    mx="auto"
                  >
                    <WeatherComponent
                      index={index}
                      data={{
                        name: data.name,
                        country: data.sys.country,
                        weather: data.weather[0].main,
                        description: data.weather[0].description,
                        temp: parseInt(data.main.temp),
                        tempMax: parseInt(data.main.temp_max),
                        tempMin: parseInt(data.main.temp_min),
                        pressure: data.main.pressure,
                        humidity: data.main.humidity,
                        visibility: data.visibility,
                        windSpeed: data.wind.speed,
                        windDegree: data.wind.deg,
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset,
                        icon: data.weather[0].icon,
                        lon: data.coord.lon,
                        lat: data.coord.lat,
                        hue: colors[index],
                      }}
                      onRemove={handleClose}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  )
}