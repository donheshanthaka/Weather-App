import React, { useState, useEffect } from "react"
import { Box, useMediaQuery, Grid, Snackbar, Alert } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import { useWeatherContext } from "../../state"
import backgroundImage from "../../assets/header_bg.png"
import cities from "../../data/cities.json"
import getWeatherDataAPI from "../../api/weather_api"
import randomHueValue from "../../utils/random_hue"
import Header from "../components/Header"
import AddCity from "../components/AddCity"
import Footer from "../components/Footer"
import WeatherComponentLayout from "../components/weather_component/WeatherComponentLayout"

export default function HomePage() {
  const { weatherData, setWeatherData } = useWeatherContext()
  const [error, setError] = useState("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const enableLogging = process.env.NODE_ENV === "development"
  const isGridToggle = useMediaQuery("(min-width:1536px)")
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const isTabletScreen = useMediaQuery("(max-width:1750px)")

  const citiesJSONObject = cities.List.reduce((acc, city) => {
    acc[city.CityCode] = city
    return acc
  }, {})

  const setCachedData = (cityCode, weatherData) => {
    const cachedWeatherData = localStorage.getItem("weatherData")
    const data = cachedWeatherData ? { ...JSON.parse(cachedWeatherData) } : {}
    data[cityCode] = weatherData
    localStorage.setItem("weatherData", JSON.stringify(data))
  }

  const getWeatherData = async (
    cityCode,
    timeStampData = 300000,
    intervalId
  ) => {
    const cachedData = localStorage.getItem("weatherData")

    const handleFetchError = (error) => {
      if (enableLogging) {
        console.error(`Failed to fetch weather data: ${error.message}`)
      }
      setError(error.message)
      setOpenErrorSnackbar(true)
      return
    }

    if (cachedData) {
      const data = JSON.parse(cachedData)
      const cityData = data[cityCode]

      if (cityData) {
        try {
          const fetchedData = await getWeatherDataAPI(cityCode)
          fetchedData.hue = cityData?.hue || randomHueValue()
          // weatherData.timestamp = Date.now()
          fetchedData.timestamp = timeStampData
          fetchedData.createdAt = cityData.createdAt
          fetchedData.timerIntervalID = cityData.timerIntervalID
          setCachedData(cityCode, fetchedData)
          setWeatherData((prevData) => ({
            ...prevData,
            [cityCode]: {
              ...fetchedData,
            },
          }))
          return true
        } catch (error) {
          handleFetchError(error)
        }
      }
    }

    try {
      const fetchedData = await getWeatherDataAPI(cityCode)
      fetchedData.hue = randomHueValue()
      fetchedData.timestamp = timeStampData
      fetchedData.createdAt = Date.now()
      fetchedData.timerIntervalID = intervalId
      setCachedData(cityCode, fetchedData)
      setWeatherData((prevData) => ({
        ...prevData,
        [cityCode]: {
          ...fetchedData,
        },
      }))
      return true
    } catch (error) {
      handleFetchError(error)
    }
  }

  useEffect(() => {
    const intervalIds = []

    const fetchWeatherData = async () => {
      const cachedWeatherData = localStorage.getItem("weatherData")
      const cityData = cachedWeatherData
        ? { ...JSON.parse(cachedWeatherData) }
        : citiesJSONObject
      for (const cityCode in cityData) {
        const timestamp = cityData[cityCode]["timestamp"]
        const intervalId = setInterval(() => {
          getWeatherData(cityCode, timestamp)
        }, timestamp)
        intervalIds.push(intervalId)
        const weather = await getWeatherData(cityCode, timestamp, intervalId)
      }
      setIsLoading(false)
    }

    fetchWeatherData()

    return () => {
      intervalIds.forEach(clearInterval)
    }
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

          <AddCity />

          <Box
            width={isMobileScreen ? "94%" : isTabletScreen ? "78%" : "64%"}
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            marginBottom="5.2rem"
          >
            {isLoading ? (
              <CircularProgress sx={{ color: "#6c5dd3" }} />
            ) : (
              <Grid container>
                {Object.entries(weatherData)
                  .sort(([, a], [, b]) => b.createdAt - a.createdAt)
                  .map(([cityCode], index) => (
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
                          isGridToggle
                            ? "85%"
                            : isThousandPixelWide
                            ? "85%"
                            : "65%"
                        }
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginTop="2rem"
                        mx="auto"
                      >
                        <WeatherComponentLayout city={cityCode} />
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            )}
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
