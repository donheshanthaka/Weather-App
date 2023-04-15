import React, { useState, useEffect } from "react"
import cities from "../../data/cities.json"
import getWeatherDataAPI from "../../api/weather_api"
import WeatherComponent from "../components/WeatherComponent"
import { Box, useMediaQuery, Grid, Snackbar, Alert } from "@mui/material"
import randomHueValue from "../../utils/random_hue"
import backgroundImage from "../../assets/header_bg.png"
import Footer from "../components/Footer"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"

export default function HomePage() {
  const [weatherData, setWeatherData] = useState([])
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
    localStorage.setItem(
      cityCode,
      JSON.stringify({ data: weatherData, timestamp: Date.now() })
    )
  }

  const getWeatherData = async (cityCode, timeStampData) => {
    const cachedData = localStorage.getItem(cityCode)
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData)
      // Check if the cached data is less than 5 minutes old
      if (Date.now() - timestamp < timeStampData) {
        return data
      }
      const weatherData = await getWeatherDataAPI(cityCode)
      if (weatherData.cod != 200) {
        setError(weatherData.message)
        setOpenErrorSnackbar(true)
        return
      }
      weatherData.hue = data.hue
      setCachedData(cityCode, weatherData)
      return weatherData
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

  const handleClose = (index) => {
    const newData = [...weatherData]
    newData.splice(index, 1)
    setWeatherData(newData)
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = []
      for (const city of cityCodes) {
        const cityCode = city.CityCode
        const weather = await getWeatherData(cityCode, city.timeStamp)
        //  only add to list if a proper data format is returned
        if (weather) {
          data.push(weather)
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
                        hue: data.hue,
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
      <Snackbar
        sx={{ marginTop: "0rem" }}
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
