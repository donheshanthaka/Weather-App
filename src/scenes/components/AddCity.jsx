import React, { useState } from "react"
import {
  Box,
  useMediaQuery,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material"
import getWeatherDataAPI from "../../api/weather_api"
import { useWeatherContext } from "../../state"
import randomHueValue from "../../utils/random_hue"
import setCacheData from "../../utils/set_cache_data"

export default function AddCity() {
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const [city, setCity] = useState("")
  const { weatherData, setWeatherData, setIntervalIds } = useWeatherContext()
  const enableLogging = process.env.NODE_ENV === "development"
  const [error, setError] = useState("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

  const getWeatherData = async (
    cityCode,
    timeDelayData = 300000,
    manualCall = false
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
        if (Date.now() - cityData.timestamp < timeDelayData && manualCall) {
          setWeatherData(data)
          return
        }

        try {
          const fetchedData = await getWeatherDataAPI(cityCode)
          fetchedData.hue = cityData?.hue || randomHueValue()
          fetchedData.timestamp = Date.now()
          fetchedData.timeDelay = timeDelayData
          fetchedData.createdAt = cityData.createdAt
          fetchedData.timerIntervalID = cityData.timerIntervalID
          setCacheData(cityCode, fetchedData)
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
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handleAddCity = async () => {
    if (!city) {
      return
    }
    try {
      const newCity = await getWeatherDataAPI(city, "q")
      if (newCity.id in weatherData) {
        throw new Error("City already in this list")
      }
      const timeDelay = 20000
      const intervalId = setInterval(() => {
        getWeatherData(newCity.id, timeDelay)
      }, timeDelay)
      newCity.hue = randomHueValue()
      newCity.timestamp = Date.now()
      newCity.timeDelay = timeDelay
      newCity.createdAt = Date.now()
      newCity.timerIntervalID = intervalId
      setWeatherData((prevData) => ({
        ...prevData,
        [newCity.id]: {
          ...newCity,
        },
      }))
      setCity("")
      setCacheData(newCity.id, newCity)
      setIntervalIds((prevIds) => [...prevIds, intervalId])
    } catch (error) {
      if (enableLogging) {
        console.error(`Failed to fetch weather data: ${error.message}`)
      }
      setCity("")
      setError(error.message)
      setOpenErrorSnackbar(true)
    }
  }

  return (
    <Box
      className="searchBox"
      width="80%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginBottom={isMobileScreen ? "2rem" : "3.4rem"}
    >
      <TextField
        size="small"
        label="Enter a city"
        inputProps={{ style: { height: "2rem", color: "white" } }}
        InputLabelProps={{ style: { color: "gray", marginTop: "5px" } }}
        sx={{
          width: "25rem",
          backgroundColor: "#1f2128",
          borderRadius: "8px 0 0 8px",
        }}
        value={city}
        onChange={handleCityChange}
      />
      <Button
        variant="contained"
        style={{
          height: "3rem",
          textTransform: "none",
          fontSize: isMobileScreen ? "0.8rem" : "1rem",
          width: isMobileScreen ? "12.3rem" : "8.3rem",
        }}
        sx={{
          backgroundColor: "#6c5dd3",
          "&:hover": {
            backgroundColor: "#5443c0",
          },
          borderRadius: "0 8px 8px 0",
        }}
        onClick={handleAddCity}
      >
        Add City
      </Button>
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
