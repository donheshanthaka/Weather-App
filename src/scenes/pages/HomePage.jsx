import React, { useState, useEffect } from "react"
import { Box, useMediaQuery, Grid, Snackbar, Alert } from "@mui/material"
import { useWeatherContext } from "../../state"
import backgroundImage from "../../assets/header_bg.png"
import cities from "../../data/cities.json"
import getWeatherDataAPI from "../../api/weather_api"
import randomHueValue from "../../utils/random_hue"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Footer from "../components/Footer"
import WeatherComponentLayout from "../components/weather_component/WeatherComponentLayout"

export default function HomePage() {
  const { weatherData, setWeatherData } = useWeatherContext()
  const [error, setError] = useState("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const isGridToggle = useMediaQuery("(min-width:1536px)")
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const isTabletScreen = useMediaQuery("(max-width:1750px)")

  const cityCodes = cities.List.map((city) => {
    return city
  })

  const setCachedData = (cityCode, weatherData) => {
    const cachedWeatherData = localStorage.getItem("weatherData")
    if (cachedWeatherData) {
      const data = { ...JSON.parse(cachedWeatherData) }
      data[cityCode] = weatherData
      data[cityCode]["timestamp"] = Date.now()
      localStorage.setItem("weatherData", JSON.stringify(data))
    } else {
      const data = {}
      data[cityCode] = weatherData
      data[cityCode]["timestamp"] = Date.now()
      localStorage.setItem("weatherData", JSON.stringify(data))
    }
  }

  const getWeatherData = async (cityCode, timeStampData) => {
    const cachedData = localStorage.getItem("weatherData")
    if (cachedData) {
      const data = JSON.parse(cachedData)
      const cityData = data[cityCode]
      if (cityData) {
        // Check if the cached data is less than 5 minutes old
        if (Date.now() - cityData.timestamp < timeStampData) {
          return cityData
        }
        const weatherData = await getWeatherDataAPI(cityCode)
        if (weatherData.cod != 200) {
          setError(weatherData.message)
          setOpenErrorSnackbar(true)
          return
        }
        weatherData.hue = cityData.hue
        setCachedData(cityCode, weatherData)
        return weatherData
      }
    }
    // Run during the the first time the page is loaded
    const weatherData = await getWeatherDataAPI(cityCode)
    if (weatherData.cod != 200) {
      setError(weatherData.message)
      setOpenErrorSnackbar(true)
      return
    }
    weatherData.hue = randomHueValue()
    setCachedData(cityCode, weatherData)
    return weatherData
  }

  const handleClose = (city) => {
    const newData = { ...weatherData }
    delete newData[city]
    setWeatherData(newData)
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = {}
      for (const city of cityCodes) {
        const cityCode = city.CityCode
        const weather = await getWeatherData(cityCode, city.timeStamp)
        //  only add to list if a proper data format is returned
        if (weather) {
          data[cityCode] = weather
        }
      }
      setWeatherData(data)
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
              {Object.keys(weatherData).map((cityCode, index) => (
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
                    <WeatherComponentLayout
                      index={index}
                      city={cityCode}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openErrorSnackbar}
        onClose={() => setOpenErrorSnackbar(false)}
        autoHideDuration={5000}
      >
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}
