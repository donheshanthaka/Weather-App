import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Box, useMediaQuery } from "@mui/material"
import { useWeatherContext } from "../../state"
import backgroundImage from "../../assets/header_bg.png"
import Header from "../components/Header"
import WeatherComponent from "../components/WeatherComponent"
import Footer from "../components/Footer"

export default function WeatherComponentPage() {
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const { weatherData, setWeatherData } = useWeatherContext()

  const { cityCode } = useParams()

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("weatherData"))
    setWeatherData(storedData)
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
      <Header />
      <Box width="100%" display="flex" justifyContent="center" minHeight="70vh">
        <Box
          width={isThousandPixelWide ? "80%" : "58%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          marginBottom="3rem"
        >
          {Object.keys(weatherData).length > 0 && (
            <WeatherComponent city={cityCode} selected={true} />
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
