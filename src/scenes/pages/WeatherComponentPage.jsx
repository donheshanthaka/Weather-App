import React from "react"
import WeatherComponent from "../components/WeatherComponent"
import { Box, useMediaQuery } from "@mui/material"
import backgroundImage from "../../assets/header_bg.png"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useLocation } from "react-router-dom"

export default function WeatherComponentPage() {
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")

  const location = useLocation()
  const cityCode = location.state.city

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
          <WeatherComponent city={cityCode} selected={true} />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
