import React from "react"
import WeatherComponent from "../components/WeatherComponent"
import { Box, useMediaQuery } from "@mui/material"
import backgroundImage from "../../assets/header_bg.png"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useLocation } from "react-router-dom"

export default function WeatherComponentPage() {
  const isThousandPixelWide = useMediaQuery("(max-width:1000px)")
  const isMobileScreen = useMediaQuery("(max-width:500px)")
  const isTabletScreen = useMediaQuery("(max-width:1750px)")

  const location = useLocation()
  const data = location.state.data

  console.log(data)
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="#1f2128"
      // backgroundColor="lightgreen"
      minHeight="100vh"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <Header />
      <Box width="100%" display="flex" justifyContent="center" height="61.5vh" backgroundColor="red">

        <Box
          // backgroundColor="lightyellow"
          // width={isMobileScreen ? "94%" : isTabletScreen ? "78%" : "64%"}
          width={isThousandPixelWide ? "80%" : "58%"}
          padding="0rem 0rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          // height="60%"
        >
          <WeatherComponent selected={true}/>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
