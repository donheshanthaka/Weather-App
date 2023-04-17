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

export default function AddCity() {
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const [city, setCity] = useState("")
  const { weatherData, setWeatherData } = useWeatherContext()
  const enableLogging = process.env.NODE_ENV === "development"
  const [error, setError] = useState("")
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false)

  const setCachedData = (cityCode, newCityData) => {
    const cachedWeatherData = localStorage.getItem("weatherData")
    const data = { ...JSON.parse(cachedWeatherData) }
    data[cityCode] = newCityData
    localStorage.setItem("weatherData", JSON.stringify(data))
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
      newCity.hue = randomHueValue()
      newCity.timestamp = Date.now()
      newCity.createdAt = Date.now()
      setWeatherData((prevData) => ({
        ...prevData,
        [newCity.id]: {
          ...newCity,
        },
      }))
      setCity("")
      setCachedData(newCity.id, newCity)
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
